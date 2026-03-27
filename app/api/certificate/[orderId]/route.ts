import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase.ts/server'
import { getAdminClient } from '@/lib/supabase.ts/admin'

type Params = {
  params: Promise<{ orderId: string }>
}

export async function GET(_: Request, { params }: Params) {
  try {
    const adminClient = getAdminClient()
    const { orderId } = await params

    const supabase = await createClient()
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: order, error: orderError } = await adminClient
      .from('orders')
      .select('id, user_id, product_id, amount_inr, status, razorpay_payment_id, created_at')
      .eq('id', orderId)
      .single()

    if (orderError || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    if (order.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { data: certificate } = await adminClient
      .from('ownership_certificates')
      .select('id, token_id, chain, status, minted_at, tx_hash')
      .eq('order_id', order.id)
      .maybeSingle()

    return NextResponse.json({
      order,
      certificate: certificate || null,
    })
  } catch (error) {
    console.error('Certificate API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
