import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase.ts/server'
import { getAdminClient } from '@/lib/supabase.ts/admin'
import { ClaimSection } from './claim-section'

export const dynamic = 'force-dynamic'

type OrderRow = {
  id: string
  amount_inr: number
  status: string
  created_at: string
  product_id: string
  products: { name: string; sku: string }[] | { name: string; sku: string } | null
}

type CertificateRow = {
  order_id: string
  status: string
  token_id: string | null
  chain: string
  wallet_type: string | null
  wallet_address: string | null
  tx_hash: string | null
  minted_at: string | null
}

export default async function DashboardPage() {
  const adminClient = getAdminClient()
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: orders } = await adminClient
    .from('orders')
    .select('id, amount_inr, status, created_at, product_id, products(name, sku)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const orderIds = (orders || []).map((order) => order.id)

  let certificates: CertificateRow[] = []
  if (orderIds.length) {
    const { data } = await adminClient
      .from('ownership_certificates')
      .select('order_id, status, token_id, chain, wallet_type, wallet_address, tx_hash, minted_at')
      .in('order_id', orderIds)

    certificates = (data || []) as CertificateRow[]
  }

  const certificateByOrder = new Map(
    certificates.map((c) => [c.order_id, c])
  )

  return (
    <main className="min-h-screen bg-brand-black text-brand-white">
      <nav className="border-b border-brand-steel bg-brand-carbon px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="font-display font-bold text-sm uppercase">
              [BRAND]
            </a>
            <span className="text-brand-muted text-xs">OWNER VAULT</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-brand-muted text-xs hidden md:block">
              {user.email}
            </span>
            <a
              href="/api/auth/logout"
              className="text-brand-muted hover:text-brand-white text-xs transition-colors"
            >
              LOGOUT
            </a>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="font-display text-3xl font-black mb-2">Owner Dashboard</h1>
        <p className="text-brand-muted text-sm mb-10">{user.email}</p>

        {(orders as OrderRow[] | null)?.length ? (
          <div className="space-y-6">
            {(orders as OrderRow[]).map((order) => {
              const cert = certificateByOrder.get(order.id)
              const tier = cert?.status === 'minted' ? 2 : 1
              const tierColor = tier === 2 ? 'brand-red' : 'brand-steel'

              return (
                <article
                  key={order.id}
                  className={`border border-${tierColor} bg-brand-carbon p-6`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <p className="serial-number mb-1">
                        {(Array.isArray(order.products) ? order.products[0]?.sku : order.products?.sku) || 'N/A'}
                      </p>
                      <h2 className="font-display text-xl font-bold">
                        {(Array.isArray(order.products) ? order.products[0]?.name : order.products?.name) || 'Product'}
                      </h2>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="serial-number">INR {order.amount_inr.toLocaleString('en-IN')}</span>
                      <span className={`px-2 py-0.5 text-xs font-display border border-${tierColor} text-${tierColor === 'brand-red' ? 'brand-red' : 'brand-muted'}`}>
                        TIER 0{tier}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-6 mb-6">
                    <ProgressStep label="ORDER CONFIRMED" done={true} />
                    <ProgressStep label="CERTIFICATE CREATED" done={!!cert} />
                    <ProgressStep label="NFT MINTED" done={cert?.status === 'minted'} />
                  </div>

                  {cert?.status === 'minted' ? (
                    <div className="border border-brand-red/30 bg-brand-black p-4 text-sm">
                      <p className="text-brand-red font-display font-bold mb-2">
                        &#x2713; NFT CLAIMED — TIER 02 VERIFIED OWNER
                      </p>
                      <p className="text-brand-muted">
                        Delivered via {cert.wallet_type === 'custodial' ? 'Custodial Wallet' : 'Self-Custody Wallet'}
                      </p>
                      {cert.wallet_type === 'self-custody' && cert.wallet_address && (
                        <p className="text-brand-muted mt-1 font-mono text-xs">
                          {cert.wallet_address.slice(0, 6)}...{cert.wallet_address.slice(-4)}
                        </p>
                      )}
                      {cert.tx_hash && (
                        <a
                          href={`https://polygonscan.com/tx/${cert.tx_hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-red text-xs mt-2 inline-block hover:underline"
                        >
                          View on Polygonscan &#8594;
                        </a>
                      )}
                    </div>
                  ) : cert?.status === 'claim_submitted' ? (
                    <div className="border border-brand-steel bg-brand-black p-4 text-sm">
                      <p className="text-brand-muted">
                        Claim submitted. Your NFT will be delivered within 24 hours.
                      </p>
                    </div>
                  ) : order.status === 'paid' ? (
                    <ClaimSection orderId={order.id} userEmail={user.email || ''} />
                  ) : (
                    <p className="text-brand-muted text-sm">
                      Order status: {order.status}
                    </p>
                  )}

                  <p className="text-brand-muted text-xs mt-4">
                    Created: {new Date(order.created_at).toLocaleString('en-IN')}
                  </p>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="border border-brand-steel bg-brand-carbon p-8 text-center">
            <p className="text-brand-muted mb-4">
              No orders yet. Visit the drop and complete checkout to see your certificate.
            </p>
            <a href="/" className="text-brand-red text-sm hover:underline">
              View current drop
            </a>
          </div>
        )}

        <div className="mt-16 border-t border-brand-steel pt-8 text-brand-muted text-xs space-y-1">
          <p>You are an owner of [BRAND].</p>
          <p>Each piece was produced in Bangalore, India.</p>
          <p>The NFC chip embedded in your garment is cryptographically unique.</p>
          <p>No restocks. No reprints. No exceptions.</p>
        </div>
      </div>
    </main>
  )
}

function ProgressStep({ label, done }: { label: string; done: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full border ${done ? 'bg-brand-red border-brand-red' : 'border-brand-steel'}`} />
      <span className={`text-xs ${done ? 'text-brand-white' : 'text-brand-muted'}`}>
        {label}
      </span>
    </div>
  )
}
