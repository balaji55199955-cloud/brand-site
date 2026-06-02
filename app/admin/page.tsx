import { getAdminClient } from '@/lib/supabase.ts/admin'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const adminClient = getAdminClient()

  const { count: waitlistCount } = await adminClient
    .from('waitlist')
    .select('id', { count: 'exact', head: true })

  const { count: ordersCount } = await adminClient
    .from('orders')
    .select('id', { count: 'exact', head: true })

  const { count: paidOrders } = await adminClient
    .from('orders')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'paid')

  const { count: pendingClaims } = await adminClient
    .from('ownership_certificates')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'claim_submitted')

  const { data: products } = await adminClient
    .from('products')
    .select('id, name, stock_left, stock_total, is_active')

  return (
    <div>
      <h1 className="font-display text-3xl font-black mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <StatCard label="Waitlist" value={waitlistCount ?? 0} href="/admin/waitlist" />
        <StatCard label="Total Orders" value={ordersCount ?? 0} href="/admin/orders" />
        <StatCard label="Paid Orders" value={paidOrders ?? 0} />
        <StatCard label="Pending Claims" value={pendingClaims ?? 0} href="/admin/claims" accent />
      </div>

      <h2 className="font-display text-xl font-bold mb-4">Products</h2>
      <div className="border border-brand-steel">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-brand-steel bg-brand-carbon">
              <th className="text-left p-3 text-brand-muted font-mono text-xs">NAME</th>
              <th className="text-left p-3 text-brand-muted font-mono text-xs">STOCK</th>
              <th className="text-left p-3 text-brand-muted font-mono text-xs">ACTIVE</th>
            </tr>
          </thead>
          <tbody>
            {(products || []).map((product) => (
              <tr key={product.id} className="border-b border-brand-steel/50">
                <td className="p-3">{product.name}</td>
                <td className="p-3 font-mono">{product.stock_left}/{product.stock_total}</td>
                <td className="p-3">
                  <span className={product.is_active ? 'text-brand-red' : 'text-brand-muted'}>
                    {product.is_active ? 'LIVE' : 'OFF'}
                  </span>
                </td>
              </tr>
            ))}
            {!products?.length && (
              <tr><td colSpan={3} className="p-3 text-brand-muted">No products yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function StatCard({ label, value, href, accent }: { label: string; value: number; href?: string; accent?: boolean }) {
  const content = (
    <div className={`border ${accent ? 'border-brand-red' : 'border-brand-steel'} bg-brand-carbon p-5`}>
      <p className="font-display font-black text-2xl">{value}</p>
      <p className="serial-number mt-1">{label}</p>
    </div>
  )
  if (href) return <a href={href}>{content}</a>
  return content
}
