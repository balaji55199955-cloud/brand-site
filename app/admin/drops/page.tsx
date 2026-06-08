import { adminSupabase } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

export default async function AdminDropsPage() {
  

  const { data: drops } = await adminSupabase
    .from('drops')
    .select('id, drop_number, name, price_inr, total_units, is_active, created_at')
    .order('drop_number', { ascending: false })

  const { data: products } = await adminSupabase
    .from('products')
    .select('id, sku, name, price_inr, stock_total, stock_left, is_active, drop_id')
    .order('created_at', { ascending: false })

  return (
    <div>
      <h1 className="font-display text-2xl font-black mb-6">Drops &amp; Products</h1>

      <section className="mb-10">
        <h2 className="font-display text-lg font-bold mb-4">Drops</h2>
        <div className="border border-brand-steel overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-steel bg-brand-carbon">
                <th className="text-left p-3 text-brand-muted font-mono text-xs">#</th>
                <th className="text-left p-3 text-brand-muted font-mono text-xs">NAME</th>
                <th className="text-left p-3 text-brand-muted font-mono text-xs">PRICE</th>
                <th className="text-left p-3 text-brand-muted font-mono text-xs">UNITS</th>
                <th className="text-left p-3 text-brand-muted font-mono text-xs">ACTIVE</th>
              </tr>
            </thead>
            <tbody>
              {(drops || []).map((drop) => (
                <tr key={drop.id} className="border-b border-brand-steel/50">
                  <td className="p-3 font-mono">{drop.drop_number}</td>
                  <td className="p-3">{drop.name}</td>
                  <td className="p-3 font-mono">&#x20B9;{drop.price_inr?.toLocaleString('en-IN')}</td>
                  <td className="p-3 font-mono">{drop.total_units}</td>
                  <td className="p-3">
                    <span className={drop.is_active ? 'text-brand-red' : 'text-brand-muted'}>
                      {drop.is_active ? 'LIVE' : 'OFF'}
                    </span>
                  </td>
                </tr>
              ))}
              {!drops?.length && (
                <tr><td colSpan={5} className="p-3 text-brand-muted">No drops created</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold mb-4">Products</h2>
        <div className="border border-brand-steel overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-steel bg-brand-carbon">
                <th className="text-left p-3 text-brand-muted font-mono text-xs">SKU</th>
                <th className="text-left p-3 text-brand-muted font-mono text-xs">NAME</th>
                <th className="text-left p-3 text-brand-muted font-mono text-xs">PRICE</th>
                <th className="text-left p-3 text-brand-muted font-mono text-xs">STOCK</th>
                <th className="text-left p-3 text-brand-muted font-mono text-xs">ACTIVE</th>
              </tr>
            </thead>
            <tbody>
              {(products || []).map((product) => (
                <tr key={product.id} className="border-b border-brand-steel/50">
                  <td className="p-3 font-mono text-xs">{product.sku}</td>
                  <td className="p-3">{product.name}</td>
                  <td className="p-3 font-mono">&#x20B9;{product.price_inr?.toLocaleString('en-IN')}</td>
                  <td className="p-3 font-mono">{product.stock_left}/{product.stock_total}</td>
                  <td className="p-3">
                    <span className={product.is_active ? 'text-brand-red' : 'text-brand-muted'}>
                      {product.is_active ? 'LIVE' : 'OFF'}
                    </span>
                  </td>
                </tr>
              ))}
              {!products?.length && (
                <tr><td colSpan={5} className="p-3 text-brand-muted">No products</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
