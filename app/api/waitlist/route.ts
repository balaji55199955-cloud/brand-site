import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const resendApiKey = process.env.RESEND_API_KEY

export async function POST(request: NextRequest) {
  try {
    const { email, phone } = await request.json()

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Invalid email' },
        { status: 400 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Check if already registered
    const { data: existing } = await supabase
      .from('waitlist')
      .select('position')
      .eq('email', email)
      .single()

    if (existing) {
      return NextResponse.json({
        success: true,
        position: existing.position,
        alreadyRegistered: true,
      })
    }

    // Get current count for position
    const { count } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })

    const position = (count || 0) + 1

    // Insert new email
    const { data, error } = await supabase
      .from('waitlist')
      .insert({
        email,
        phone: phone || null,
        position,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to join waitlist' },
        { status: 500 }
      )
    }

    // Send confirmation email via Resend
    if (resendApiKey) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'noreply@waitlist.[BRAND].com',
            to: email,
            subject: "You're on the list. [BRAND] Drop 001.",
            html: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>[BRAND] Waitlist Confirmation</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #080808; font-family: 'Instrument Sans', Arial, sans-serif;">
    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #080808; padding: 40px 20px;">
      <tr>
        <td align="center">
          <table width="100%" max-width="600" cellspacing="0" cellpadding="0" border="0">
            <!-- Header -->
            <tr>
              <td style="padding: 0 0 30px 0;" align="center">
                <h1 style="margin: 0; font-family: 'Orbitron', sans-serif; font-size: 24px; font-weight: 900; color: #F0EDE8; letter-spacing: 0.2em;">
                  [BRAND]
                </h1>
              </td>
            </tr>

            <!-- Main message -->
            <tr>
              <td style="padding: 0 0 30px 0;" align="center">
                <h2 style="margin: 0; font-family: 'Orbitron', sans-serif; font-size: 28px; font-weight: 700; color: #F0EDE8; text-transform: uppercase;">
                  You're on the list.
                </h2>
              </td>
            </tr>

            <!-- Position -->
            <tr>
              <td style="padding: 0 0 30px 0;" align="center">
                <p style="margin: 0; font-family: 'Orbitron', sans-serif; font-size: 48px; font-weight: 900; color: #C41E3A;">
                  #${position}
                </p>
              </td>
            </tr>

            <!-- Body text -->
            <tr>
              <td style="padding: 0 0 30px 0;" align="center">
                <p style="margin: 0; font-family: Arial, sans-serif; font-size: 14px; color: #6B6B6B; line-height: 1.6;">
                  Drop 001 opens soon. You'll be the first to know.<br>
                  Only 10 pieces. Your position does not guarantee access —<br>
                  invite links go to the first 11 on the list.
                </p>
              </td>
            </tr>

            <!-- Warning -->
            <tr>
              <td style="padding: 20px; border: 1px solid #1C1C1E; background-color: #111111;" align="center">
                <p style="margin: 0; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #6B6B6B; text-transform: uppercase; letter-spacing: 0.1em;">
                  Do not share this email. Access is non-transferable.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding: 40px 0 0 0;" align="center">
                <p style="margin: 0; font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #6B6B6B;">
                  Bangalore, India — 2026
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
            `,
          }),
        })
      } catch (emailError) {
        console.error('Resend email error:', emailError)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({
      success: true,
      position,
    })
  } catch (error) {
    console.error('Waitlist API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
