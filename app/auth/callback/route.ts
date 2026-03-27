import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase.ts/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') || '/dashboard'

  // Validate redirect path to prevent open redirect attacks
  // Only allow paths that start with / and don't contain //
  const safeNext = next.startsWith('/') && !next.includes('//')
    ? next
    : '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      // Session exchange failed - redirect to login with error
      return NextResponse.redirect(
        `${origin}/login?error=auth_failed`
      )
    }

    // Verify the session was actually created
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.redirect(
        `${origin}/login?error=auth_failed`
      )
    }
  }

  return NextResponse.redirect(`${origin}${safeNext}`)
}
