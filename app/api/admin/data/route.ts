import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { adminSupabase } from '@/lib/supabase/admin'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const allCookies = cookieStore.getAll()

    // Find supabase auth token from cookies
    let accessToken: string | null = null
    for (const cookie of allCookies) {
      if (cookie.name.includes('auth-token')) {
        try {
          const parsed = JSON.parse(cookie.value)
          if (parsed.access_token) {
            accessToken = parsed.access_token
            break
          }
        } catch {
          // might be chunked - try combining
        }
      }
    }

    // Handle chunked cookies (Supabase splits large cookies)
    if (!accessToken) {
      const baseName = allCookies.find(c => c.name.includes('auth-token.0'))?.name?.replace('.0', '')
      if (baseName) {
        let combined = ''
        let i = 0
        while (true) {
          const chunk = allCookies.find(c => c.name === `${baseName}.${i}`)
          if (!chunk) break
          combined += chunk.value
          i++
        }
        if (combined) {
          try {
            const parsed = JSON.parse(combined)
            accessToken = parsed.access_token || null
          } catch { /* ignore */ }
        }
      }
    }

    if (!accessToken) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    

    // Verify user with admin client
    const { data: { user }, error: userError } = await adminSupabase.auth.getUser(accessToken)

    if (userError || !user || user.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const [waitlistRes, ordersRes, productsRes, certsRes] = await Promise.all([
      adminSupabase.from('waitlist').select('id, email, position, invited, created_at', { count: 'exact' }).order('position', { ascending: true }).limit(50),
      adminSupabase.from('orders').select('id, amount_inr, status, created_at, products(name, sku)', { count: 'exact' }).order('created_at', { ascending: false }).limit(50),
      adminSupabase.from('products').select('id, name, sku, price_inr, stock_total, stock_left, is_active'),
      adminSupabase.from('ownership_certificates').select('id, status, wallet_type, wallet_address, token_id, tx_hash, created_at').order('created_at', { ascending: false }).limit(50),
    ])

    return NextResponse.json({
      user: { email: user.email },
      waitlist: { data: waitlistRes.data || [], count: waitlistRes.count ?? 0 },
      orders: { data: ordersRes.data || [], count: ordersRes.count ?? 0 },
      products: productsRes.data || [],
      certificates: certsRes.data || [],
    })
  } catch (error) {
    console.error('Admin data error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
