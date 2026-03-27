import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // Check if already exists
    const { data: existing } = await supabase
      .from('waitlist')
      .select('*')
      .eq('email', email)
      .single()

    if (existing) {
      return NextResponse.json({
        success: true,
        alreadyRegistered: true,
        position: existing.position
      })
    }

    // Insert new
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email }])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      alreadyRegistered: false,
      position: data.position
    })

  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}