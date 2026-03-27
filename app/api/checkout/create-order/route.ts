import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase.ts/server'
import { getAdminClient } from '@/lib/supabase.ts/admin'
import { getRazorpayClient } from '@/lib/razorpay'

type CreateOrderPayload = {
  productId?: string
}

export async function POST(request: Request) {
  try {
    const adminClient = getAdminClient()
    const razorpay = getRazorpayClient()
    const { productId } = (await request.json()) as CreateOrderPayload
    if (!productId) {
      return NextResponse.json(
        { error: 'Missing productId' },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: reserved, error: reserveError } = await adminClient.rpc(
      'reserve_product_stock',
      {
        p_product_id: productId,
      }
    )

    if (reserveError || !reserved) {
      return NextResponse.json(
        { error: 'Product sold out or unavailable' },
        { status: 409 }
      )
    }

    const { data: product, error: productError } = await adminClient
      .from('products')
      .select('id, sku, name, price_inr')
      .eq('id', productId)
      .single()

    if (productError || !product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const amountPaise = Number(product.price_inr) * 100
    if (!Number.isFinite(amountPaise) || amountPaise <= 0) {
      return NextResponse.json(
        { error: 'Invalid product pricing' },
        { status: 500 }
      )
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: amountPaise,
      currency: 'INR',
      receipt: `order_${Date.now()}`,
      notes: {
        productId: product.id,
        userId: user.id,
      },
    })

    const { error: insertError } = await adminClient.from('orders').insert({
      user_id: user.id,
      product_id: product.id,
      amount_inr: product.price_inr,
      status: 'created',
      razorpay_order_id: razorpayOrder.id,
    })

    if (insertError) {
      return NextResponse.json(
        { error: 'Failed to create order record' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      product: {
        id: product.id,
        name: product.name,
        sku: product.sku,
      },
    })
  } catch (error) {
    console.error('Create order API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
