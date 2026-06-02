'use client'

import { useState } from 'react'

type ClaimSectionProps = {
  orderId: string
  userEmail: string
}

export function ClaimSection({ orderId, userEmail }: ClaimSectionProps) {
  const [tab, setTab] = useState<'custodial' | 'self-custody'>('custodial')
  const [walletAddress, setWalletAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleClaim() {
    setLoading(true)
    setMessage('')

    try {
      const body: Record<string, string> = { orderId, method: tab }
      if (tab === 'self-custody') {
        body.walletAddress = walletAddress
      }

      const res = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) {
        setMessage(data.error || 'Claim failed')
        return
      }

      if (data.alreadyClaimed) {
        setMessage('Already claimed.')
        return
      }

      setSuccess(true)
      setMessage(data.message)
    } catch {
      setMessage('Unable to submit claim.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="border border-brand-red/30 bg-brand-black p-4 text-sm">
        <p className="text-brand-red font-display font-bold mb-1">CLAIM SUBMITTED</p>
        <p className="text-brand-muted">{message}</p>
      </div>
    )
  }

  return (
    <div className="border border-brand-steel bg-brand-black p-5">
      <h3 className="font-display font-bold text-sm mb-1">CLAIM YOUR DIGITAL TWIN</h3>
      <p className="text-brand-muted text-xs mb-4">
        Your NFT is your permanent certificate of ownership on Polygon. Claiming upgrades you to Tier 02.
      </p>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab('custodial')}
          className={`px-3 py-1.5 text-xs font-display transition-colors ${
            tab === 'custodial'
              ? 'bg-brand-red text-brand-white'
              : 'border border-brand-steel text-brand-muted hover:text-brand-white'
          }`}
        >
          I&apos;M NEW TO CRYPTO
        </button>
        <button
          onClick={() => setTab('self-custody')}
          className={`px-3 py-1.5 text-xs font-display transition-colors ${
            tab === 'self-custody'
              ? 'bg-brand-red text-brand-white'
              : 'border border-brand-steel text-brand-muted hover:text-brand-white'
          }`}
        >
          I HAVE A WALLET
        </button>
      </div>

      {tab === 'custodial' ? (
        <div>
          <p className="text-brand-muted text-xs mb-3">
            We create a wallet for you using just your email. No crypto knowledge needed.
          </p>
          <p className="text-brand-white text-sm font-mono mb-4 bg-brand-carbon p-2 border border-brand-steel">
            {userEmail}
          </p>
          <button
            onClick={handleClaim}
            disabled={loading}
            className="w-full py-2.5 bg-brand-red text-brand-white font-display text-xs uppercase tracking-wider disabled:opacity-50 transition-opacity"
          >
            {loading ? 'SUBMITTING...' : 'CREATE WALLET & CLAIM'}
          </button>
        </div>
      ) : (
        <div>
          <p className="text-brand-muted text-xs mb-3">
            Enter your Polygon-compatible wallet address (MetaMask, Rainbow, etc.)
          </p>
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder="0x..."
            className="w-full bg-brand-carbon border border-brand-steel px-3 py-2.5 text-sm font-mono outline-none focus:border-brand-red mb-4 transition-colors"
          />
          <button
            onClick={handleClaim}
            disabled={loading || !walletAddress.startsWith('0x') || walletAddress.length !== 42}
            className="w-full py-2.5 bg-brand-red text-brand-white font-display text-xs uppercase tracking-wider disabled:opacity-50 transition-opacity"
          >
            {loading ? 'SUBMITTING...' : 'CLAIM TO MY WALLET'}
          </button>
        </div>
      )}

      {message && <p className="text-brand-muted text-xs mt-3">{message}</p>}
    </div>
  )
}
