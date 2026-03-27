import crypto from 'node:crypto'
import { NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase.ts/admin'

function randomCode() {
  return crypto.randomBytes(6).toString('hex').toUpperCase()
}

export async function POST(request: Request) {
  try {
    // Disable in production unless explicitly enabled via env var
    const isDev = process.env.NODE_ENV === 'development'
    const allowProdSeed = process.env.ALLOW_PROD_SEED === 'true'

    if (!isDev && !allowProdSeed) {
      return NextResponse.json(
        { error: 'Seed endpoint disabled in production' },
        { status: 403 }
      )
    }

    const token = request.headers.get('x-seed-token')
    if (!token || token !== process.env.ADMIN_SEED_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const adminClient = getAdminClient()

    const { data: drop, error: dropError } = await adminClient
      .from('drops')
      .upsert(
        {
          drop_number: 1,
          name: '[BRAND] Drop 001',
          description: 'Ultra-limited phygital streetwear drop.',
          price_inr: 14999,
          total_units: 10,
          backup_units: 1,
          is_active: true,
        },
        { onConflict: 'drop_number' }
      )
      .select('id')
      .single()

    if (dropError || !drop) {
      return NextResponse.json({ error: 'Failed to create drop' }, { status: 500 })
    }

    const { data: product, error: productError } = await adminClient
      .from('products')
      .upsert(
        {
          drop_id: drop.id,
          sku: 'DROP001-TEE-BLK-OS',
          name: '[BRAND] Drop 001 Tee',
          description: '500 GSM heavyweight tee with embedded NFC authenticity chip.',
          price_inr: 14999,
          stock_total: 10,
          stock_left: 10,
          is_active: true,
        },
        { onConflict: 'sku' }
      )
      .select('id, sku, name')
      .single()

    if (productError || !product) {
      return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
    }

    await adminClient.from('nfc_tags').upsert(
      {
        product_id: product.id,
        chip_uid_hash: `seed-${product.id}`,
        public_code: `BRAND-${randomCode()}`,
        is_active: true,
      },
      { onConflict: 'chip_uid_hash' }
    )

    return NextResponse.json({
      ok: true,
      product,
      checkoutUrl: `/checkout/${product.id}`,
    })
  } catch (error) {
    console.error('Seed API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
