import { NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase/admin'

export async function GET() {
  try {
    const adminClient = getAdminClient()
    const { data, error } = await adminClient
      .from('products')
      .select('id, sku, name, description, price_inr, stock_left')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
    }

    return NextResponse.json({ products: data || [] })
  } catch (error) {
    console.error('Active products API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
