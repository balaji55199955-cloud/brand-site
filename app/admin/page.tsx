'use client'

import { useState, useEffect } from 'react'

type AdminData = {
  user: { email: string }
  waitlist: { data: { id: string; email: string; position: number | null; invited: boolean; created_at: string }[]; count: number }
  orders: { data: { id: string; amount_inr: number; status: string; created_at: string; products: { name: string; sku: string }[] | { name: string; sku: string } | null }[]; count: number }
  products: { id: string; name: string; sku: string; price_inr: number; stock_total: number; stock_left: number; is_active: boolean }[]
  certificates: { id: string; status: string; wallet_type: string | null; wallet_address: string | null; token_id: string | null; tx_hash: string | null; created_at: string }[]
}

export default function AdminPage() {
  const [data, setData] = useState<AdminData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [tab, setTab] = useState<'overview' | 'waitlist' | 'orders' | 'claims' | 'settings'>('overview')

  useEffect(() => {
    fetch('/api/admin/data')
      .then((res) => {
        if (res.status === 403) { window.location.href = '/login'; return null }
        return res.json()
      })
      .then((d) => { if (d) setData(d) })
      .catch(() => setError('Failed to load'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-brand-black text-brand-white flex items-center justify-center">
        <p className="text-brand-muted font-mono">Loading admin...</p>
      </main>
    )
  }

  if (error || !data) {
    return (
      <main className="min-h-screen bg-brand-black text-brand-white flex items-center justify-center">
        <p className="text-brand-red">{error || 'Access denied'}</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-brand-black text-brand-white">
      <nav className="border-b border-brand-red bg-brand-carbon px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-display font-bold text-sm uppercase">Leous ADMIN</span>
            <button onClick={() => setTab('overview')} className={`text-xs ${tab === 'overview' ? 'text-brand-red' : 'text-brand-muted hover:text-brand-white'}`}>OVERVIEW</button>
            <button onClick={() => setTab('waitlist')} className={`text-xs ${tab === 'waitlist' ? 'text-brand-red' : 'text-brand-muted hover:text-brand-white'}`}>WAITLIST</button>
            <button onClick={() => setTab('orders')} className={`text-xs ${tab === 'orders' ? 'text-brand-red' : 'text-brand-muted hover:text-brand-white'}`}>ORDERS</button>
            <button onClick={() => setTab('claims')} className={`text-xs ${tab === 'claims' ? 'text-brand-red' : 'text-brand-muted hover:text-brand-white'}`}>CLAIMS</button>
            <button onClick={() => setTab('settings')} className={`text-xs ${tab === 'settings' ? 'text-brand-red' : 'text-brand-muted hover:text-brand-white'}`}>SETTINGS</button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-brand-muted text-xs">{data.user.email}</span>
            <a href="/" className="text-brand-muted text-xs hover:text-brand-white">EXIT</a>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {tab === 'overview' && <OverviewTab data={data} />}
        {tab === 'waitlist' && <WaitlistTab waitlist={data.waitlist} />}
        {tab === 'orders' && <OrdersTab orders={data.orders} />}
        {tab === 'claims' && <ClaimsTab certificates={data.certificates} />}
        {tab === 'settings' && <SettingsTab />}
      </div>
    </main>
  )
}

function OverviewTab({ data }: { data: AdminData }) {
  const totalStock = data.products.reduce((s, p) => s + (p.stock_total || 0), 0)
  const soldStock = data.products.reduce((s, p) => s + ((p.stock_total || 0) - (p.stock_left || 0)), 0)

  return (
    <div>
      <h1 className="font-display text-3xl font-black mb-8">Command Center</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatCard label="Waitlist" value={data.waitlist.count} />
        <StatCard label="Orders" value={data.orders.count} accent />
        <StatCard label="Products" value={data.products.length} />
        <StatCard label="Pending Claims" value={data.certificates.filter(c => c.status === 'claim_submitted').length} warn />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-display font-bold text-sm mb-3">INVENTORY</h2>
          <div className="border border-brand-steel bg-brand-carbon p-4">
            <div className="flex justify-between mb-2"><span className="text-brand-muted text-xs">Total</span><span className="font-mono text-sm">{totalStock}</span></div>
            <div className="flex justify-between mb-2"><span className="text-brand-muted text-xs">Sold</span><span className="font-mono text-sm text-brand-red">{soldStock}</span></div>
            <div className="flex justify-between mb-3"><span className="text-brand-muted text-xs">Left</span><span className="font-mono text-sm">{totalStock - soldStock}</span></div>
            <div className="w-full h-2 bg-brand-steel rounded-full overflow-hidden">
              <div className="h-full bg-brand-red" style={{ width: `${totalStock > 0 ? (soldStock / totalStock) * 100 : 0}%` }} />
            </div>
          </div>
        </div>
        <div>
          <h2 className="font-display font-bold text-sm mb-3">PRODUCTS</h2>
          <div className="border border-brand-steel divide-y divide-brand-steel/50">
            {data.products.map(p => (
              <div key={p.id} className="p-3 flex justify-between">
                <div><p className="text-xs">{p.name}</p><p className="serial-number">{p.sku}</p></div>
                <div className="text-right"><p className="font-mono text-xs">₹{p.price_inr?.toLocaleString('en-IN')}</p><p className={`text-xs ${p.is_active ? 'text-brand-red' : 'text-brand-muted'}`}>{p.is_active ? 'LIVE' : 'OFF'}</p></div>
              </div>
            ))}
            {!data.products.length && <p className="p-3 text-brand-muted text-xs">No products</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

function WaitlistTab({ waitlist }: { waitlist: AdminData['waitlist'] }) {
  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="font-display text-2xl font-black">Waitlist</h1>
        <p className="serial-number">{waitlist.count} entries</p>
      </div>
      <div className="border border-brand-steel overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-brand-steel bg-brand-carbon">
            <th className="text-left p-3 text-brand-muted font-mono text-xs">#</th>
            <th className="text-left p-3 text-brand-muted font-mono text-xs">EMAIL</th>
            <th className="text-left p-3 text-brand-muted font-mono text-xs">INVITED</th>
            <th className="text-left p-3 text-brand-muted font-mono text-xs">JOINED</th>
          </tr></thead>
          <tbody>
            {waitlist.data.map(e => (
              <tr key={e.id} className="border-b border-brand-steel/50">
                <td className="p-3 font-mono text-brand-muted">{e.position ?? '—'}</td>
                <td className="p-3">{e.email}</td>
                <td className="p-3"><span className={e.invited ? 'text-brand-red' : 'text-brand-muted'}>{e.invited ? 'YES' : 'NO'}</span></td>
                <td className="p-3 text-brand-muted text-xs">{new Date(e.created_at).toLocaleDateString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function OrdersTab({ orders }: { orders: AdminData['orders'] }) {
  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="font-display text-2xl font-black">Orders</h1>
        <p className="serial-number">{orders.count} total</p>
      </div>
      <div className="border border-brand-steel overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-brand-steel bg-brand-carbon">
            <th className="text-left p-3 text-brand-muted font-mono text-xs">PRODUCT</th>
            <th className="text-left p-3 text-brand-muted font-mono text-xs">AMOUNT</th>
            <th className="text-left p-3 text-brand-muted font-mono text-xs">STATUS</th>
            <th className="text-left p-3 text-brand-muted font-mono text-xs">DATE</th>
          </tr></thead>
          <tbody>
            {orders.data.map(o => {
              const product = Array.isArray(o.products) ? o.products[0] : o.products
              return (
                <tr key={o.id} className="border-b border-brand-steel/50">
                  <td className="p-3"><p className="text-xs">{product?.name || 'Unknown'}</p><p className="serial-number">{product?.sku || ''}</p></td>
                  <td className="p-3 font-mono">₹{o.amount_inr?.toLocaleString('en-IN')}</td>
                  <td className="p-3"><span className={`px-2 py-0.5 text-xs ${o.status === 'paid' ? 'bg-brand-red/20 text-brand-red' : 'text-brand-muted'}`}>{o.status?.toUpperCase()}</span></td>
                  <td className="p-3 text-brand-muted text-xs">{new Date(o.created_at).toLocaleDateString('en-IN')}</td>
                </tr>
              )
            })}
            {!orders.data.length && <tr><td colSpan={4} className="p-3 text-brand-muted">No orders</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ClaimsTab({ certificates }: { certificates: AdminData['certificates'] }) {
  const [tokenId, setTokenId] = useState('')
  const [txHash, setTxHash] = useState('')

  async function handleMint(certId: string) {
    if (!tokenId || !txHash) return
    await fetch('/api/admin/mark-minted', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ certId, tokenId, txHash }),
    })
    window.location.reload()
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-black mb-6">NFT Claims</h1>
      <div className="border border-brand-steel overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-brand-steel bg-brand-carbon">
            <th className="text-left p-3 text-brand-muted font-mono text-xs">STATUS</th>
            <th className="text-left p-3 text-brand-muted font-mono text-xs">TYPE</th>
            <th className="text-left p-3 text-brand-muted font-mono text-xs">WALLET</th>
            <th className="text-left p-3 text-brand-muted font-mono text-xs">TOKEN ID</th>
            <th className="text-left p-3 text-brand-muted font-mono text-xs">ACTION</th>
          </tr></thead>
          <tbody>
            {certificates.map(c => (
              <tr key={c.id} className="border-b border-brand-steel/50">
                <td className="p-3"><span className={`text-xs ${c.status === 'minted' ? 'text-brand-red' : c.status === 'claim_submitted' ? 'text-brand-gold' : 'text-brand-muted'}`}>{c.status?.toUpperCase()}</span></td>
                <td className="p-3 text-xs">{c.wallet_type || '—'}</td>
                <td className="p-3 font-mono text-xs text-brand-muted">{c.wallet_address ? (c.wallet_address.startsWith('CUSTODIAL:') ? c.wallet_address.replace('CUSTODIAL:', '') : `${c.wallet_address.slice(0, 6)}...${c.wallet_address.slice(-4)}`) : '—'}</td>
                <td className="p-3 font-mono text-xs">{c.token_id || '—'}</td>
                <td className="p-3">
                  {c.status === 'claim_submitted' && (
                    <div className="flex flex-col gap-1">
                      <input value={tokenId} onChange={e => setTokenId(e.target.value)} placeholder="Token ID" className="admin-input w-24" />
                      <input value={txHash} onChange={e => setTxHash(e.target.value)} placeholder="TX Hash" className="admin-input w-24" />
                      <button onClick={() => handleMint(c.id)} className="admin-btn text-xs">MINT</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {!certificates.length && <tr><td colSpan={5} className="p-3 text-brand-muted">No claims</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SettingsTab() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>, action: string) {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    const formData = new FormData(e.currentTarget)
    formData.set('action', action)
    try {
      const res = await fetch('/api/admin/manage', { method: 'POST', body: formData })
      const data = await res.json()
      setMessage(res.ok ? 'Done!' : (data.error || 'Failed'))
      if (res.ok) e.currentTarget.reset()
    } catch { setMessage('Error') }
    finally { setLoading(false) }
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-black mb-6">Settings</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <form onSubmit={e => handleSubmit(e, 'create-drop')} className="border border-brand-steel bg-brand-carbon p-5 space-y-3">
          <h3 className="font-display font-bold text-sm">NEW DROP</h3>
          <input name="drop_number" type="number" placeholder="Drop number" required className="admin-input w-full" />
          <input name="name" placeholder="Name" required className="admin-input w-full" />
          <textarea name="description" placeholder="Description" rows={2} className="admin-input w-full" />
          <input name="price_inr" type="number" placeholder="Price (INR)" required className="admin-input w-full" />
          <input name="total_units" type="number" placeholder="Units (10)" className="admin-input w-full" />
          <label className="flex items-center gap-2 text-xs text-brand-muted"><input name="is_active" type="checkbox" value="true" /> Active</label>
          <button type="submit" disabled={loading} className="admin-btn">{loading ? '...' : 'Create Drop'}</button>
        </form>

        <form onSubmit={e => handleSubmit(e, 'create-product')} className="border border-brand-steel bg-brand-carbon p-5 space-y-3">
          <h3 className="font-display font-bold text-sm">NEW PRODUCT</h3>
          <input name="sku" placeholder="SKU" required className="admin-input w-full" />
          <input name="name" placeholder="Name" required className="admin-input w-full" />
          <textarea name="description" placeholder="Description" rows={2} className="admin-input w-full" />
          <input name="price_inr" type="number" placeholder="Price (INR)" required className="admin-input w-full" />
          <input name="stock_total" type="number" placeholder="Stock (10)" className="admin-input w-full" />
          <input name="image_url" placeholder="Image URL (optional)" className="admin-input w-full" />
          <label className="flex items-center gap-2 text-xs text-brand-muted"><input name="is_active" type="checkbox" value="true" /> Active</label>
          <button type="submit" disabled={loading} className="admin-btn">{loading ? '...' : 'Create Product'}</button>
        </form>
      </div>
      {message && <p className="text-brand-muted text-sm mt-4">{message}</p>}
    </div>
  )
}

function StatCard({ label, value, accent, warn }: { label: string; value: number; accent?: boolean; warn?: boolean }) {
  return (
    <div className={`border ${warn ? 'border-brand-gold' : accent ? 'border-brand-red' : 'border-brand-steel'} bg-brand-carbon p-5`}>
      <p className={`font-display font-black text-2xl ${accent ? 'text-brand-red' : warn ? 'text-brand-gold' : ''}`}>{value}</p>
      <p className="serial-number mt-1">{label}</p>
    </div>
  )
}
