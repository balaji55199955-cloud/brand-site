import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { adminSupabase } from '@/lib/supabase/admin'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { orderId, method, walletAddress } = await request.json()

    if (!orderId || !method) {
      return NextResponse.json({ error: 'Missing orderId or method' }, { status: 400 })
    }

    if (method !== 'custodial' && method !== 'self-custody') {
      return NextResponse.json({ error: 'Invalid method' }, { status: 400 })
    }

    if (method === 'self-custody') {
      if (!walletAddress || !walletAddress.startsWith('0x') || walletAddress.length !== 42) {
        return NextResponse.json({ error: 'Invalid wallet address format' }, { status: 400 })
      }
    }

    

    const { data: order, error: orderError } = await adminSupabase
      .from('orders')
      .select('id, user_id, product_id, status')
      .eq('id', orderId)
      .single()

    if (orderError || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    if (order.user_id !== user.id) {
      return NextResponse.json({ error: 'Order not found for this account' }, { status: 404 })
    }

    if (order.status !== 'paid') {
      return NextResponse.json({ error: 'Order not eligible for claim' }, { status: 400 })
    }

    const { data: existingCert } = await adminSupabase
      .from('ownership_certificates')
      .select('id, status')
      .eq('order_id', orderId)
      .single()

    if (existingCert?.status === 'minted') {
      return NextResponse.json({ alreadyClaimed: true, message: 'Already claimed' })
    }

    const resolvedWallet = method === 'custodial'
      ? `CUSTODIAL:${user.email}`
      : walletAddress

    if (existingCert) {
      await adminSupabase
        .from('ownership_certificates')
        .update({
          wallet_address: resolvedWallet,
          wallet_type: method,
          status: 'claim_submitted',
        })
        .eq('id', existingCert.id)
    } else {
      await adminSupabase
        .from('ownership_certificates')
        .insert({
          order_id: orderId,
          product_id: order.product_id,
          chain: 'polygon',
          status: 'claim_submitted',
          wallet_address: resolvedWallet,
          wallet_type: method,
        })
    }

    return NextResponse.json({
      success: true,
      method,
      message: method === 'custodial'
        ? 'Your NFT wallet is being set up. Delivered within 24 hours.'
        : 'Claim submitted. NFT delivered to your wallet within 24 hours.',
    })
  } catch (error) {
    console.error('Claim API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
