import { NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase.ts/admin'
import { resend } from '@/lib/resend'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const supabase = getAdminClient()

    const { data: existing } = await supabase
      .from('waitlist')
      .select('position')
      .eq('email', email)
      .single()

    if (existing) {
      return NextResponse.json({
        success: true,
        alreadyRegistered: true,
        position: existing.position,
      })
    }

    const { count } = await supabase
      .from('waitlist')
      .select('id', { count: 'exact', head: true })

    const position = (count ?? 0) + 1

    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email, position }])
      .select('id, position')
      .single()

    if (error) {
      return NextResponse.json({ error: 'Unable to join waitlist' }, { status: 400 })
    }

    if (resend) {
      const from = process.env.FROM_EMAIL || 'onboarding@resend.dev'
      await resend.emails.send({
        from,
        to: email,
        subject: "You're on the list. [BRAND] Drop 001.",
        html: `
          <div style="background:#080808;color:#F0EDE8;font-family:Arial,sans-serif;padding:40px;max-width:500px;margin:0 auto;">
            <p style="font-size:12px;letter-spacing:0.15em;color:#6B6B6B;margin-bottom:24px;">[BRAND]</p>
            <h1 style="font-size:28px;margin:0 0 16px;">YOU'RE ON THE LIST.</h1>
            <p style="color:#C41E3A;font-size:18px;margin-bottom:24px;">Position #${data.position}</p>
            <p style="color:#F0EDE8;line-height:1.6;margin-bottom:16px;">Drop 001 opens soon. You'll be the first to know.</p>
            <p style="color:#6B6B6B;font-size:13px;line-height:1.6;margin-bottom:16px;">Only 10 pieces. Your position does not guarantee access — invite links go to the first 11 on the list.</p>
            <p style="color:#6B6B6B;font-size:13px;">Do not share this email. Access is non-transferable.</p>
            <hr style="border:none;border-top:1px solid #1C1C1E;margin:32px 0;" />
            <p style="color:#6B6B6B;font-size:11px;">&copy; 2026 [BRAND] — Bangalore</p>
          </div>
        `,
      }).catch(() => {})
    }

    return NextResponse.json({
      success: true,
      alreadyRegistered: false,
      position: data.position,
    })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
