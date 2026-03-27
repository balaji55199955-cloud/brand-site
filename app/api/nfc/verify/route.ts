import { NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase/admin'
import { nfcVerifyLimiter } from '@/lib/rate-limit'

export async function GET(request: Request) {
  try {
    // Rate limit by IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    const rateLimit = nfcVerifyLimiter(ip)

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

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
      .select('name, sku')
      .eq('id', tag.product_id)
      .single()

    const { data: certificate } = await adminClient
      .from('ownership_certificates')
      .select('status, minted_at')
      .eq('product_id', tag.product_id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    // Return only public-facing data - no internal IDs exposed
    return NextResponse.json({
      authentic: true,
      product: product ? {
        name: product.name,
        sku: product.sku,
      } : null,
      certificate: certificate ? {
        status: certificate.status,
        minted_at: certificate.minted_at,
      } : null,
    })
  } catch (error) {
    console.error('NFC verify API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
