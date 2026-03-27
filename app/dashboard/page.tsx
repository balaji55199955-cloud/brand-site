import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase.ts/server'
import { getAdminClient } from '@/lib/supabase.ts/admin'

export const dynamic = 'force-dynamic'

type OrderRow = {
  id: string
  amount_inr: number
  status: string
  created_at: string
  products: { name: string; sku: string } | null
}

type CertificateRow = {
  order_id: string
  status: string
  token_id: string | null
  chain: string
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
    .select('id, amount_inr, status, created_at, products(name, sku)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const orderIds = (orders || []).map((order) => order.id)

  let certificates: CertificateRow[] = []
  if (orderIds.length) {
    const { data } = await adminClient
      .from('ownership_certificates')
      .select('order_id, status, token_id, chain')
      .in('order_id', orderIds)

    certificates = (data || []) as CertificateRow[]
  }

  const certificateByOrder = new Map(
    certificates.map((certificate) => [certificate.order_id, certificate])
  )

  return (
    <main className="min-h-screen bg-brand-black text-brand-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-display text-4xl font-black mb-2">Owner dashboard</h1>
        <p className="text-brand-muted mb-10">{user.email}</p>

        <div className="space-y-4">
          {(orders as OrderRow[] | null)?.map((order) => {
            const cert = certificateByOrder.get(order.id)
            return (
              <article
                key={order.id}
                className="border border-brand-steel bg-brand-carbon p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-display text-xl">
                    {order.products?.name || 'Product'} ({order.products?.sku || 'N/A'})
                  </p>
                  <span className="serial-number">INR {order.amount_inr}</span>
                </div>

                <div className="mt-4 text-sm text-brand-muted space-y-1">
                  <p>Order status: {order.status}</p>
                  <p>Certificate: {cert?.status || 'not created'}</p>
                  <p>Chain: {cert?.chain || 'polygon'}</p>
                  <p>Token ID: {cert?.token_id || 'pending'}</p>
                  <p>Created: {new Date(order.created_at).toLocaleString('en-IN')}</p>
                </div>
              </article>
            )
          })}
        </div>

        {!orders?.length ? (
          <div className="border border-brand-steel bg-brand-carbon p-6 mt-4 text-brand-muted">
            No orders yet. Visit the drop and complete checkout to see your certificate.
          </div>
        ) : null}
      </div>
    </main>
  )
}
