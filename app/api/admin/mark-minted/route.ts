import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { adminSupabase } from '@/lib/supabase/admin'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { certId, tokenId, txHash } = await request.json()

    if (!certId || !tokenId || !txHash) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    

    const { error } = await adminSupabase
      .from('ownership_certificates')
      .update({
        status: 'minted',
        token_id: tokenId,
        tx_hash: txHash,
        minted_at: new Date().toISOString(),
      })
      .eq('id', certId)

    if (error) {
      return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
