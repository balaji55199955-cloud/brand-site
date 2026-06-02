'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'

type VerifyResult = {
  authentic?: boolean
  message?: string
  product?: { name: string; sku: string }
  certificate?: { status?: string; minted_at?: string | null }
  scanCount?: number
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-brand-black flex items-center justify-center">
        <p className="text-brand-muted">Loading...</p>
      </main>
    }>
      <VerifyContent />
    </Suspense>
  )
}

function VerifyContent() {
  const searchParams = useSearchParams()
  const initialCode = searchParams.get('code') || ''
  const [code, setCode] = useState(initialCode)
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
      <div className="max-w-xl mx-auto">
        <div className="border border-brand-steel bg-brand-carbon p-8">
          <h1 className="font-display text-4xl font-black mb-2">Verify garment</h1>
          <p className="text-brand-muted mb-8">
            Scan NFC or enter your public verification code.
          </p>

          <form onSubmit={handleVerify} className="space-y-4">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              placeholder="Enter public code (e.g. BRAND-A1B2C3)"
              className="w-full bg-brand-black border border-brand-steel px-4 py-3 outline-none focus:border-brand-red transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-red py-3 font-display uppercase tracking-wide disabled:opacity-60 transition-opacity"
            >
              {loading ? 'Verifying...' : 'Verify authenticity'}
            </button>
          </form>
        </div>

        {result && (
          <div className="mt-6">
            {result.authentic ? (
              <div>
                <div className="bg-brand-red p-6 text-center">
                  <p className="font-display font-black text-2xl md:text-3xl text-brand-white">
                    &#x2713; AUTHENTIC
                  </p>
                  <p className="text-brand-white/80 text-sm mt-2">
                    Verified {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </p>
                </div>

                <div className="border border-brand-red bg-brand-carbon p-6 mt-4">
                  {result.product && (
                    <>
                      <p className="serial-number text-lg">{result.product.sku}</p>
                      <h2 className="font-display font-bold text-xl mt-2">{result.product.name}</h2>
                    </>
                  )}
                  {result.certificate && (
                    <p className="text-brand-muted text-sm mt-3">
                      Certificate: {result.certificate.status}
                      {result.certificate.minted_at && ` — Minted ${new Date(result.certificate.minted_at).toLocaleDateString('en-IN')}`}
                    </p>
                  )}
                </div>

                <details className="mt-4 border border-brand-steel bg-brand-carbon">
                  <summary className="p-4 cursor-pointer text-brand-muted text-sm hover:text-brand-white transition-colors">
                    Authentication Details
                  </summary>
                  <div className="px-4 pb-4 text-brand-muted text-xs space-y-1">
                    <p>This item is registered on the Polygon blockchain.</p>
                    <p>NFC Chip: NTAG 424 DNA — AES-128 encrypted. Unclonable.</p>
                    <p>Manufactured in Bangalore, India.</p>
                    <p>500 GSM heavyweight construction.</p>
                    <p>Serial {code} — Permanent registry entry.</p>
                  </div>
                </details>

                <div className="mt-6 text-brand-muted text-xs space-y-1">
                  <p>[BRAND] makes 10 pieces per drop. No more. No reprints.</p>
                  <p>Each piece has an embedded NFC chip and a paired NFT on the blockchain.</p>
                  <p>What you are holding is one of 10 pieces in existence.</p>
                </div>
              </div>
            ) : (
              <div className="border border-brand-steel bg-brand-carbon p-8 text-center">
                <p className="text-brand-red font-display font-bold text-2xl mb-3">UNVERIFIED</p>
                <p className="text-brand-muted text-sm mb-4">
                  {result.message || 'This code is not in [BRAND]\'s registry.'}
                </p>
                <p className="text-brand-muted text-xs">
                  If you believe this is an error, contact us via WhatsApp.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-10 text-center">
          <a href="/" className="text-brand-red text-sm hover:underline">
            &#8592; Back to home
          </a>
        </div>
      </div>
    </main>
  )
}
