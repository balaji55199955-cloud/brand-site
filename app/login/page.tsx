'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { KeyRound, Sparkles, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const redirectTo = `${window.location.origin}/auth/callback?next=/dashboard`
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
  }

  if (sent) {
    return (
      <main className="min-h-screen bg-[#0A0A0A] flex items-center justify-center relative overflow-hidden px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#C9A96E]/5 blur-[150px] pointer-events-none" />
        <div className="w-full max-w-md bg-[#1A1A1A]/30 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-12 text-center space-y-6 relative group shadow-2xl">
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[32px]">
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#C9A96E] blur-[120px] opacity-10" />
          </div>
          <div className="w-16 h-16 rounded-full bg-[#C9A96E]/10 flex items-center justify-center mx-auto border border-[#C9A96E]/30">
            <Sparkles className="w-8 h-8 text-[#C9A96E]" />
          </div>
          <h2 className="text-white text-2xl font-sans font-medium tracking-tight">Check your email</h2>
          <p className="text-[#8C8580] text-[15px] leading-relaxed">
            We sent a secure access link to <span className="text-white font-medium">{email}</span>. Click the link in your email to instantly verify ownership.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] flex items-center justify-center relative overflow-hidden px-4">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#C9A96E]/5 blur-[150px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#1A1A1A]/30 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-10 relative group shadow-2xl">
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[32px]">
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#C9A96E] blur-[120px] opacity-10" />
        </div>

        <div className="relative z-10 space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#1A1A1A] px-4.5 py-1.5 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <KeyRound className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span className="uppercase tracking-[0.05em] text-[10px] font-semibold text-white/90">SECURE VAULT ACCESS</span>
            </div>
            <h1 className="text-white text-3xl font-display font-bold leading-tight">
              Owner <span className="font-sans font-normal">Login</span>
            </h1>
            <p className="text-[#8C8580] text-[14px]">
              Access your digital certificates, mint certificates, and check physical garment ownership.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#8C8580]/40 outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] transition-all"
              />
            </div>

            {error && (
              <p className="text-red-400 text-xs">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-[#C9A96E] text-white text-sm font-medium hover:bg-[#C9A96E]/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none shadow-[0_0_30px_#C9A96E]"
            >
              {loading ? 'Sending link...' : 'Send Access Link'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
