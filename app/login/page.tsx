'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const supabase = createClient()
      const redirectTo = `${window.location.origin}/auth/callback?next=/dashboard`
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectTo,
        },
      })

      if (error) {
        setMessage(error.message)
      } else {
        setMessage('Check your email for the sign-in link.')
      }
    } catch {
      setMessage('Unable to start sign-in flow.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-brand-black text-brand-white flex items-center justify-center px-6">
      <div className="w-full max-w-md border border-brand-steel bg-brand-carbon p-8">
        <h1 className="font-display text-3xl font-bold mb-2">Owner login</h1>
        <p className="text-brand-muted text-sm mb-6">
          Sign in to access your dashboard and ownership certificates.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-brand-black border border-brand-steel px-4 py-3 outline-none focus:border-brand-red"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-red py-3 font-display uppercase tracking-wide disabled:opacity-60"
          >
            {loading ? 'Sending link...' : 'Send magic link'}
          </button>
        </form>

        {message ? <p className="mt-4 text-sm text-brand-muted">{message}</p> : null}
      </div>
    </main>
  )
}
