'use client'

import { useState } from 'react'

export function AdminClaimActions({ certId }: { certId: string }) {
  const [tokenId, setTokenId] = useState('')
  const [txHash, setTxHash] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleMarkMinted() {
    if (!tokenId || !txHash) return
    setLoading(true)

    try {
      const res = await fetch('/api/admin/mark-minted', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ certId, tokenId, txHash }),
      })

      if (res.ok) {
        setDone(true)
      }
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return <span className="text-brand-red text-xs">MINTED</span>
  }

  return (
    <div className="flex flex-col gap-1">
      <input
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
        placeholder="Token ID"
        className="bg-brand-black border border-brand-steel px-2 py-1 text-xs w-28 outline-none focus:border-brand-red"
      />
      <input
        value={txHash}
        onChange={(e) => setTxHash(e.target.value)}
        placeholder="TX Hash"
        className="bg-brand-black border border-brand-steel px-2 py-1 text-xs w-28 outline-none focus:border-brand-red"
      />
      <button
        onClick={handleMarkMinted}
        disabled={loading || !tokenId || !txHash}
        className="bg-brand-red text-brand-white text-xs px-2 py-1 disabled:opacity-50"
      >
        {loading ? '...' : 'MARK MINTED'}
      </button>
    </div>
  )
}
