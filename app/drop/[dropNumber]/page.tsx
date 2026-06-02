'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void
    }
  }
}

type DropData = {
  id: string
  name: string
  description: string | null
  price_inr: number
  total_units: number
  units_sold: number
  is_active: boolean
  close_date: string | null
  product_details: Record<string, string> | null
}

export default function DropPage() {
  const params = useParams<{ dropNumber: string }>()
  const [drop, setDrop] = useState<DropData | null>(null)
  const [loading, setLoading] = useState(true)
  const [purchasing, setPurchasing] = useState(false)
  const [message, setMessage] = useState('')
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    fetch(`/api/drops/${params.dropNumber}`)
      .then((res) => res.json())
      .then((data) => setDrop(data.drop ?? null))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [params.dropNumber])

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)
    return () => { document.body.removeChild(script) }
  }, [])

  useEffect(() => {
    if (!drop?.close_date) return
    const target = new Date(drop.close_date).getTime()
    const interval = setInterval(() => {
      const diff = target - Date.now()
      if (diff <= 0) {
        setTimeLeft('CLOSED')
        clearInterval(interval)
        return
      }
      const h = Math.floor(diff / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setTimeLeft(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`)
    }, 1000)
    return () => clearInterval(interval)
  }, [drop?.close_date])

  if (loading) {
    return (
      <main className="min-h-screen bg-brand-black flex items-center justify-center">
        <p className="text-brand-muted">Loading drop...</p>
      </main>
    )
  }

  if (!drop || !drop.is_active) {
    return (
      <main className="min-h-screen bg-brand-black flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-display font-black text-3xl md:text-5xl text-brand-white mb-4">
            {drop ? 'THIS DROP HAS ENDED.' : 'THIS DROP HAS NOT OPENED YET.'}
          </h1>
          <a href="/" className="text-brand-red text-sm hover:underline">
            Back to home
          </a>
        </div>
      </main>
    )
  }

  const unitsRemaining = drop.total_units - drop.units_sold
  const soldOut = unitsRemaining <= 0
  const scarcityPercent = (drop.units_sold / drop.total_units) * 100

  async function handleBuy() {
    setPurchasing(true)
    setMessage('')

    try {
      const res = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: drop!.id }),
      })

      const data = await res.json()
      if (!res.ok) {
        setMessage(data.error || 'Failed to start checkout')
        return
      }

      const razorpay = new window.Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: '[BRAND]',
        description: `${data.product.name} (${data.product.sku})`,
        order_id: data.orderId,
        theme: { color: '#C41E3A' },
        handler: function () {
          setMessage('Payment initiated. Verifying server-side...')
          window.location.href = '/dashboard?order=confirmed'
        },
      })

      razorpay.open()
    } catch {
      setMessage('Unable to initiate payment.')
    } finally {
      setPurchasing(false)
    }
  }

  return (
    <main className="min-h-screen bg-brand-black text-brand-white">
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="flex-1 bg-brand-carbon flex items-center justify-center relative p-12">
          <span className="absolute top-6 left-6 font-display text-brand-red text-sm">
            DROP 00{params.dropNumber}
          </span>
          <div className="text-center">
            <span className="font-display text-brand-muted text-6xl">[BRAND]</span>
          </div>
          <span className="absolute bottom-6 left-6 font-display text-brand-white text-lg">
            {drop.name}
          </span>
        </div>

        <div className="w-full md:w-[440px] bg-brand-carbon border-l border-brand-steel p-8 flex flex-col justify-center">
          <p className="serial-number mb-6">
            {unitsRemaining} OF {drop.total_units} REMAINING
          </p>

          <div className="w-full h-1 bg-brand-steel mb-8 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-red transition-all"
              style={{ width: `${scarcityPercent}%` }}
            />
          </div>

          <p className="font-display font-black text-4xl mb-6">
            &#x20B9;{(drop.price_inr).toLocaleString('en-IN')}
          </p>

          <ul className="text-brand-muted text-sm space-y-2 mb-8">
            <li>500 GSM Heavyweight Garment</li>
            <li>Embroidered Serial Number</li>
            <li>NTAG 424 DNA NFC Chip</li>
            <li>NFT Certificate of Ownership (Polygon)</li>
            <li>Tier 02 Verified Owner Status</li>
          </ul>

          {timeLeft && timeLeft !== 'CLOSED' && (
            <p className="serial-number mb-4">
              Purchase window closes in {timeLeft}
            </p>
          )}

          {soldOut ? (
            <button
              disabled
              className="w-full py-4 bg-brand-steel text-brand-muted font-display text-sm uppercase tracking-wider cursor-not-allowed"
            >
              SOLD OUT
            </button>
          ) : (
            <button
              onClick={handleBuy}
              disabled={purchasing}
              className="w-full py-4 bg-brand-red text-brand-white font-display font-bold text-sm uppercase tracking-wider hover:bg-[#a01830] transition-colors disabled:opacity-50"
            >
              {purchasing ? 'PROCESSING...' : 'BUY NOW'}
            </button>
          )}

          {message && (
            <p className="text-brand-muted text-sm mt-4">{message}</p>
          )}

          <div className="mt-10 pt-6 border-t border-brand-steel text-brand-muted text-xs space-y-1">
            <p>Verified by blockchain. Authenticated by NFC.</p>
            <p>No restocks. No exceptions.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
