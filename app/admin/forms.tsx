'use client'

import { useState } from 'react'

export function CreateDropForm() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const form = e.currentTarget
    const formData = new FormData(form)
    formData.set('action', 'create-drop')

    try {
      const res = await fetch('/api/admin/manage', { method: 'POST', body: formData })
      const data = await res.json()
      if (res.ok) {
        setMessage('Drop created')
        form.reset()
        setTimeout(() => window.location.reload(), 1000)
      } else {
        setMessage(data.error || 'Failed')
      }
    } catch {
      setMessage('Error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border border-brand-steel bg-brand-carbon p-5 space-y-3">
      <h3 className="font-display font-bold text-sm mb-2">CREATE NEW DROP</h3>
      <div className="grid grid-cols-2 gap-3">
        <input name="drop_number" type="number" placeholder="Drop number (e.g. 1)" required className="admin-input" />
        <input name="name" placeholder="Drop name" required className="admin-input" />
      </div>
      <textarea name="description" placeholder="Description" rows={2} className="admin-input w-full" />
      <div className="grid grid-cols-3 gap-3">
        <input name="price_inr" type="number" placeholder="Price (INR)" required className="admin-input" />
        <input name="total_units" type="number" placeholder="Units (default 10)" className="admin-input" />
        <label className="flex items-center gap-2 text-xs text-brand-muted">
          <input name="is_active" type="checkbox" value="true" /> Active
        </label>
      </div>
      <button type="submit" disabled={loading} className="admin-btn">
        {loading ? 'Creating...' : 'Create Drop'}
      </button>
      {message && <p className="text-xs text-brand-muted">{message}</p>}
    </form>
  )
}

export function CreateProductForm({ drops }: { drops: { id: string; name: string }[] }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [uploading, setUploading] = useState(false)

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)

    const formData = new FormData()
    formData.set('action', 'upload-image')
    formData.set('file', file)

    try {
      const res = await fetch('/api/admin/manage', { method: 'POST', body: formData })
      const data = await res.json()
      if (res.ok && data.url) {
        setImageUrl(data.url)
      }
    } catch {
      // ignore
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const form = e.currentTarget
    const formData = new FormData(form)
    formData.set('action', 'create-product')
    if (imageUrl) formData.set('image_url', imageUrl)

    try {
      const res = await fetch('/api/admin/manage', { method: 'POST', body: formData })
      const data = await res.json()
      if (res.ok) {
        setMessage('Product created')
        form.reset()
        setImageUrl('')
        setTimeout(() => window.location.reload(), 1000)
      } else {
        setMessage(data.error || 'Failed')
      }
    } catch {
      setMessage('Error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border border-brand-steel bg-brand-carbon p-5 space-y-3">
      <h3 className="font-display font-bold text-sm mb-2">CREATE NEW PRODUCT</h3>
      <div className="grid grid-cols-2 gap-3">
        <input name="sku" placeholder="SKU (e.g. DROP001-TEE-BLK)" required className="admin-input" />
        <input name="name" placeholder="Product name" required className="admin-input" />
      </div>
      <textarea name="description" placeholder="Description" rows={2} className="admin-input w-full" />
      <div className="grid grid-cols-3 gap-3">
        <input name="price_inr" type="number" placeholder="Price (INR)" required className="admin-input" />
        <input name="stock_total" type="number" placeholder="Stock (default 10)" className="admin-input" />
        <select name="drop_id" className="admin-input">
          <option value="">No drop</option>
          {drops.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs text-brand-muted block mb-1">Product Image</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} className="text-xs text-brand-muted" />
        {uploading && <span className="text-xs text-brand-muted ml-2">Uploading...</span>}
        {imageUrl && (
          <div className="mt-2">
            <img src={imageUrl} alt="Preview" className="w-20 h-20 object-cover border border-brand-steel" />
          </div>
        )}
      </div>
      <label className="flex items-center gap-2 text-xs text-brand-muted">
        <input name="is_active" type="checkbox" value="true" /> Active
      </label>
      <button type="submit" disabled={loading} className="admin-btn">
        {loading ? 'Creating...' : 'Create Product'}
      </button>
      {message && <p className="text-xs text-brand-muted">{message}</p>}
    </form>
  )
}

export function SeoForm({ current }: { current: { site_title?: string; site_description?: string; og_image?: string; keywords?: string } }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const form = e.currentTarget
    const formData = new FormData(form)
    formData.set('action', 'update-seo')

    try {
      const res = await fetch('/api/admin/manage', { method: 'POST', body: formData })
      if (res.ok) {
        setMessage('SEO settings saved')
      } else {
        const data = await res.json()
        setMessage(data.error || 'Failed')
      }
    } catch {
      setMessage('Error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border border-brand-steel bg-brand-carbon p-5 space-y-3">
      <h3 className="font-display font-bold text-sm mb-2">SEO SETTINGS</h3>
      <input name="site_title" defaultValue={current.site_title || ''} placeholder="Site title" className="admin-input w-full" />
      <textarea name="site_description" defaultValue={current.site_description || ''} placeholder="Meta description" rows={2} className="admin-input w-full" />
      <input name="keywords" defaultValue={current.keywords || ''} placeholder="Keywords (comma separated)" className="admin-input w-full" />
      <input name="og_image" defaultValue={current.og_image || ''} placeholder="OG Image URL" className="admin-input w-full" />
      <button type="submit" disabled={loading} className="admin-btn">
        {loading ? 'Saving...' : 'Save SEO Settings'}
      </button>
      {message && <p className="text-xs text-brand-muted">{message}</p>}
    </form>
  )
}

export function InviteButton({ entryId }: { entryId: string }) {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleInvite() {
    setLoading(true)
    const formData = new FormData()
    formData.set('action', 'invite-waitlist')
    formData.set('id', entryId)
    formData.set('drop_access', '1')

    try {
      const res = await fetch('/api/admin/manage', { method: 'POST', body: formData })
      if (res.ok) setDone(true)
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  if (done) return <span className="text-brand-red text-xs">INVITED</span>

  return (
    <button onClick={handleInvite} disabled={loading} className="text-xs bg-brand-red text-brand-white px-2 py-0.5 disabled:opacity-50">
      {loading ? '...' : 'INVITE'}
    </button>
  )
}
