import { NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase/admin'

export async function GET(request: Request) {
  try {
    const adminClient = getAdminClient()
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')

    if (!code) {
      return NextResponse.json({ error: 'Missing code' }, { status: 400 })
    }

    const { data: tag, error: tagError } = await adminClient
      .from('nfc_tags')
      .select('id, product_id, public_code, is_active')
      .eq('public_code', code)
      .single()

    if (tagError || !tag || !tag.is_active) {
      return NextResponse.json({
        authentic: false,
        message: 'Invalid or inactive NFC code',
      })
    }

    const { data: product } = await adminClient
      .from('products')
      .select('id, name, sku')
      .eq('id', tag.product_id)
      .single()

    const { data: certificate } = await adminClient
      .from('ownership_certificates')
      .select('status, token_id, minted_at, order_id')
      .eq('product_id', tag.product_id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    return NextResponse.json({
      authentic: true,
      product,
      certificate: certificate || null,
    })
  } catch (error) {
    console.error('NFC verify API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
