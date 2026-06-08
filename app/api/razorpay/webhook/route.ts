import { NextResponse } from 'next/server'
import { adminSupabase } from '@/lib/supabase/admin'
import {
  verifyRazorpayWebhookSignature,
} from '@/lib/razorpay'
import { sendPurchaseConfirmEmail } from '@/lib/resend'

export async function POST(request: Request) {
  try {
    
    const payload = await request.text()
    const signature = request.headers.get('x-razorpay-signature')

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
    }

    const isValid = verifyRazorpayWebhookSignature(payload, signature)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event = JSON.parse(payload) as {
      event?: string
      payload?: {
        payment?: {
          entity?: {
            id?: string
            order_id?: string
            status?: string
          }
        }
      }
    }

    if (event.event !== 'payment.captured') {
      return NextResponse.json({ ok: true })
    }

    const payment = event.payload?.payment?.entity
    const razorpayOrderId = payment?.order_id
    const razorpayPaymentId = payment?.id

    if (!razorpayOrderId || !razorpayPaymentId) {
      return NextResponse.json({ error: 'Invalid payment payload' }, { status: 400 })
    }

    const { data: order, error: orderError } = await adminSupabase
      .from('orders')
      .select('id, user_id, product_id, status')
      .eq('razorpay_order_id', razorpayOrderId)
      .single()

    if (orderError || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    if (order.status === 'paid') {
      return NextResponse.json({ ok: true })
    }

    const { error: updateError } = await adminSupabase
      .from('orders')
      .update({
        status: 'paid',
        razorpay_payment_id: razorpayPaymentId,
      })
      .eq('id', order.id)

    if (updateError) {
      return NextResponse.json(
        { error: 'Failed to update order' },
        { status: 500 }
      )
    }

    const { error: certError } = await adminSupabase
      .from('ownership_certificates')
      .upsert(
        {
          order_id: order.id,
          product_id: order.product_id,
          chain: 'polygon',
          status: 'pending',
        },
        { onConflict: 'order_id' }
      )

    if (certError) {
      return NextResponse.json(
        { error: 'Failed to create certificate' },
        { status: 500 }
      )
    }

    const { data: userData } = await adminSupabase.auth.admin.getUserById(order.user_id)
    const email = userData.user?.email
    if (email) {
      await sendPurchaseConfirmEmail(order.id, order.user_id)
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Razorpay webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
