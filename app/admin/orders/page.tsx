import { adminSupabase } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

export default async function AdminOrdersPage() {
  

  const { data: orders } = await adminSupabase
    .from('orders')
    .select('id, user_id, product_id, amount_inr, status, razorpay_payment_id, created_at, products(name, sku)')
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-black">Orders</h1>
        <p className="serial-number">{orders?.length ?? 0} orders</p>
      </div>

      <div className="border border-brand-steel overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-brand-steel bg-brand-carbon">
              <th className="text-left p-3 text-brand-muted font-mono text-xs">PRODUCT</th>
              <th className="text-left p-3 text-brand-muted font-mono text-xs">AMOUNT</th>
              <th className="text-left p-3 text-brand-muted font-mono text-xs">STATUS</th>
              <th className="text-left p-3 text-brand-muted font-mono text-xs">PAYMENT ID</th>
              <th className="text-left p-3 text-brand-muted font-mono text-xs">DATE</th>
            </tr>
          </thead>
          <tbody>
            {(orders || []).map((order) => {
              const product = Array.isArray(order.products) ? order.products[0] : order.products
              return (
                <tr key={order.id} className="border-b border-brand-steel/50 hover:bg-brand-carbon/50">
                  <td className="p-3">
                    <p className="font-mono text-xs text-brand-muted">{product?.sku || 'N/A'}</p>
                    <p>{product?.name || 'Unknown'}</p>
                  </td>
                  <td className="p-3 font-mono">&#x20B9;{order.amount_inr?.toLocaleString('en-IN')}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 text-xs ${
                      order.status === 'paid' ? 'bg-brand-red/20 text-brand-red' :
                      order.status === 'created' ? 'bg-brand-steel text-brand-muted' :
                      'text-brand-muted'
                    }`}>
                      {order.status?.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-xs text-brand-muted">
                    {order.razorpay_payment_id
                      ? `${order.razorpay_payment_id.slice(0, 12)}...`
                      : '—'}
                  </td>
                  <td className="p-3 text-brand-muted text-xs">
                    {new Date(order.created_at).toLocaleDateString('en-IN')}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
