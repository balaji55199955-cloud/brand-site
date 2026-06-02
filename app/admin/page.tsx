import { getAdminClient } from '@/lib/supabase.ts/admin'

export const dynamic = 'force-dynamic'

export default async function AdminOverviewPage() {
  const adminClient = getAdminClient()

  const { count: waitlistCount } = await adminClient
    .from('waitlist')
    .select('id', { count: 'exact', head: true })

  const { count: totalOrders } = await adminClient
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

  const { count: mintedNfts } = await adminClient
    .from('ownership_certificates')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'minted')

  const { data: recentOrders } = await adminClient
    .from('orders')
    .select('id, amount_inr, status, created_at, products(name, sku)')
    .order('created_at', { ascending: false })
    .limit(5)

  const { data: recentWaitlist } = await adminClient
    .from('waitlist')
    .select('email, position, created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  const { data: products } = await adminClient
    .from('products')
    .select('id, name, sku, price_inr, stock_total, stock_left, is_active')

  const totalRevenue = (paidOrders || 0) > 0
    ? await adminClient
        .from('orders')
        .select('amount_inr')
        .eq('status', 'paid')
        .then(({ data }) => (data || []).reduce((sum, o) => sum + (o.amount_inr || 0), 0))
    : 0

  const totalStock = (products || []).reduce((sum, p) => sum + (p.stock_total || 0), 0)
  const soldStock = (products || []).reduce((sum, p) => sum + ((p.stock_total || 0) - (p.stock_left || 0)), 0)

  return (
    <div>
      <h1 className="font-display text-3xl font-black mb-2">Command Center</h1>
      <p className="text-brand-muted text-sm mb-8">Full overview of [BRAND] operations</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
        <StatCard label="Waitlist" value={waitlistCount ?? 0} />
        <StatCard label="Orders" value={totalOrders ?? 0} />
        <StatCard label="Paid" value={paidOrders ?? 0} accent />
        <StatCard label="Revenue" value={`₹${(totalRevenue as number).toLocaleString('en-IN')}`} accent />
        <StatCard label="Pending Claims" value={pendingClaims ?? 0} warn />
        <StatCard label="NFTs Minted" value={mintedNfts ?? 0} />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div>
          <h2 className="font-display font-bold text-sm mb-3">INVENTORY</h2>
          <div className="border border-brand-steel bg-brand-carbon p-4">
            <div className="flex justify-between mb-2">
              <span className="text-brand-muted text-xs">Total Stock</span>
              <span className="font-mono text-sm">{totalStock}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-brand-muted text-xs">Sold</span>
              <span className="font-mono text-sm text-brand-red">{soldStock}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="text-brand-muted text-xs">Remaining</span>
              <span className="font-mono text-sm">{totalStock - soldStock}</span>
            </div>
            <div className="w-full h-2 bg-brand-steel rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-red"
                style={{ width: `${totalStock > 0 ? (soldStock / totalStock) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-display font-bold text-sm mb-3">CONVERSION FUNNEL</h2>
          <div className="border border-brand-steel bg-brand-carbon p-4 space-y-2">
            <FunnelRow label="Waitlist signups" value={waitlistCount ?? 0} pct={100} />
            <FunnelRow label="Orders created" value={totalOrders ?? 0} pct={waitlistCount ? ((totalOrders ?? 0) / waitlistCount) * 100 : 0} />
            <FunnelRow label="Payments confirmed" value={paidOrders ?? 0} pct={waitlistCount ? ((paidOrders ?? 0) / waitlistCount) * 100 : 0} />
            <FunnelRow label="NFTs claimed" value={mintedNfts ?? 0} pct={waitlistCount ? ((mintedNfts ?? 0) / waitlistCount) * 100 : 0} />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-display font-bold text-sm mb-3">RECENT ORDERS</h2>
          <div className="border border-brand-steel divide-y divide-brand-steel/50">
            {(recentOrders || []).map((order) => {
              const product = Array.isArray(order.products) ? order.products[0] : order.products
              return (
                <div key={order.id} className="p-3 flex justify-between items-center">
                  <div>
                    <p className="text-xs">{product?.name || 'Product'}</p>
                    <p className="text-brand-muted text-xs">{new Date(order.created_at).toLocaleDateString('en-IN')}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-xs">₹{order.amount_inr?.toLocaleString('en-IN')}</p>
                    <span className={`text-xs ${order.status === 'paid' ? 'text-brand-red' : 'text-brand-muted'}`}>
                      {order.status?.toUpperCase()}
                    </span>
                  </div>
                </div>
              )
            })}
            {!recentOrders?.length && <p className="p-3 text-brand-muted text-xs">No orders yet</p>}
          </div>
        </div>

        <div>
          <h2 className="font-display font-bold text-sm mb-3">RECENT WAITLIST</h2>
          <div className="border border-brand-steel divide-y divide-brand-steel/50">
            {(recentWaitlist || []).map((entry, i) => (
              <div key={i} className="p-3 flex justify-between items-center">
                <p className="text-xs">{entry.email}</p>
                <div className="text-right">
                  <p className="font-mono text-xs text-brand-muted">#{entry.position}</p>
                  <p className="text-brand-muted text-xs">{new Date(entry.created_at).toLocaleDateString('en-IN')}</p>
                </div>
              </div>
            ))}
            {!recentWaitlist?.length && <p className="p-3 text-brand-muted text-xs">No signups yet</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, accent, warn }: { label: string; value: number | string; accent?: boolean; warn?: boolean }) {
  return (
    <div className={`border ${warn ? 'border-brand-gold' : accent ? 'border-brand-red' : 'border-brand-steel'} bg-brand-carbon p-4`}>
      <p className={`font-display font-black text-xl ${accent ? 'text-brand-red' : warn ? 'text-brand-gold' : ''}`}>
        {value}
      </p>
      <p className="serial-number mt-1">{label}</p>
    </div>
  )
}

function FunnelRow({ label, value, pct }: { label: string; value: number; pct: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-brand-muted">{label}</span>
        <span className="font-mono">{value} <span className="text-brand-muted">({Math.round(pct)}%)</span></span>
      </div>
      <div className="w-full h-1 bg-brand-steel rounded-full overflow-hidden">
        <div className="h-full bg-brand-red" style={{ width: `${Math.min(pct, 100)}%` }} />
      </div>
    </div>
  )
}
