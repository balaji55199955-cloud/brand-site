'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'

type CreateOrderResponse = {
  orderId: string
  amount: number
  currency: string
  keyId: string
  product: {
    id: string
    name: string
    sku: string
  }
}

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void
    }
  }
}

export default function CheckoutPage() {
  const params = useParams<{ productId: string }>()
  const productId = useMemo(() => params.productId, [params.productId])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  async function startCheckout() {
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      })

      const data = (await response.json()) as CreateOrderResponse | { error: string }
      if (!response.ok || !('orderId' in data)) {
        setMessage('error' in data ? data.error : 'Failed to start checkout')
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
          setMessage('Payment initiated. We will verify it server-side shortly.')
        },
      })

      razorpay.open()
    } catch {
      setMessage('Unable to initiate payment.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-brand-black text-brand-white px-6 py-12">
      <div className="max-w-2xl mx-auto border border-brand-steel bg-brand-carbon p-8">
        <p className="serial-number mb-4">Checkout</p>
        <h1 className="font-display text-4xl font-black mb-3">Drop purchase</h1>
        <p className="text-brand-muted mb-8">
          Complete payment in INR. Ownership certificate is generated after webhook
          verification.
        </p>

        <button
          onClick={startCheckout}
          disabled={loading}
          className="w-full bg-brand-red py-3 font-display uppercase tracking-wide disabled:opacity-60"
        >
          {loading ? 'Starting checkout...' : 'Pay with Razorpay'}
        </button>

        {message ? <p className="text-sm text-brand-muted mt-4">{message}</p> : null}
      </div>
    </main>
  )
}
