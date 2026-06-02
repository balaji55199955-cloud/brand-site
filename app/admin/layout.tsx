import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase.ts/server'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail || user.email !== adminEmail) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-brand-black text-brand-white">
      <nav className="border-b border-brand-red bg-brand-carbon px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/admin" className="font-display font-bold text-sm uppercase">
              [BRAND] ADMIN
            </a>
            <div className="hidden md:flex items-center gap-4 ml-6">
              <a href="/admin" className="text-brand-muted hover:text-brand-white text-xs transition-colors">
                OVERVIEW
              </a>
              <a href="/admin/waitlist" className="text-brand-muted hover:text-brand-white text-xs transition-colors">
                WAITLIST
              </a>
              <a href="/admin/orders" className="text-brand-muted hover:text-brand-white text-xs transition-colors">
                ORDERS
              </a>
              <a href="/admin/claims" className="text-brand-muted hover:text-brand-white text-xs transition-colors">
                NFT CLAIMS
              </a>
              <a href="/admin/drops" className="text-brand-muted hover:text-brand-white text-xs transition-colors">
                DROPS
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-brand-muted text-xs">{user.email}</span>
            <a href="/" className="text-brand-muted hover:text-brand-white text-xs">
              EXIT
            </a>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  )
}
