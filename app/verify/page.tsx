'use client'

import { useState } from 'react'

type VerifyResult = {
  authentic?: boolean
  message?: string
  product?: { name: string; sku: string }
  certificate?: { status?: string; token_id?: string | null }
}

export default function VerifyPage() {
  const [code, setCode] = useState('')
  const [result, setResult] = useState<VerifyResult | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch(`/api/nfc/verify?code=${encodeURIComponent(code)}`)
      const data = (await response.json()) as VerifyResult
      setResult(data)
    } catch {
      setResult({ message: 'Unable to verify code right now.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-brand-black text-brand-white px-6 py-12">
      <div className="max-w-xl mx-auto border border-brand-steel bg-brand-carbon p-8">
        <h1 className="font-display text-4xl font-black mb-2">Verify garment</h1>
        <p className="text-brand-muted mb-8">
          Scan NFC or enter your public verification code.
        </p>

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            placeholder="Enter public code"
            className="w-full bg-brand-black border border-brand-steel px-4 py-3 outline-none focus:border-brand-red"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-red py-3 font-display uppercase tracking-wide disabled:opacity-60"
          >
            {loading ? 'Verifying...' : 'Verify authenticity'}
          </button>
        </form>

        {result ? (
          <div className="mt-6 border border-brand-steel p-4 text-sm">
            <p>Authentic: {result.authentic ? 'Yes' : 'No'}</p>
            {result.product ? (
              <p>
                Product: {result.product.name} ({result.product.sku})
              </p>
            ) : null}
            {result.certificate ? (
              <p>
                Certificate: {result.certificate.status} / Token ID:{' '}
                {result.certificate.token_id || 'pending'}
              </p>
            ) : null}
            {result.message ? <p>{result.message}</p> : null}
          </div>
        ) : null}
      </div>
    </main>
  )
}
