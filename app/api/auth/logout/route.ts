import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase.ts/server'

export async function GET(request: Request) {
  const supabase = await createClient()
  await supabase.auth.signOut()

  const { origin } = new URL(request.url)
  return NextResponse.redirect(`${origin}/`)
}
