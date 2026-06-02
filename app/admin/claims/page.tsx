import { getAdminClient } from '@/lib/supabase.ts/admin'
import { AdminClaimActions } from './actions'

export const dynamic = 'force-dynamic'

export default async function AdminClaimsPage() {
  const adminClient = getAdminClient()

  const { data: certs } = await adminClient
    .from('ownership_certificates')
    .select('id, order_id, product_id, status, wallet_address, wallet_type, token_id, tx_hash, chain, created_at')
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-black">NFT Claims</h1>
        <p className="serial-number">{certs?.length ?? 0} certificates</p>
      </div>

      <div className="border border-brand-steel overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-brand-steel bg-brand-carbon">
              <th className="text-left p-3 text-brand-muted font-mono text-xs">STATUS</th>
              <th className="text-left p-3 text-brand-muted font-mono text-xs">WALLET TYPE</th>
              <th className="text-left p-3 text-brand-muted font-mono text-xs">WALLET</th>
              <th className="text-left p-3 text-brand-muted font-mono text-xs">TOKEN ID</th>
              <th className="text-left p-3 text-brand-muted font-mono text-xs">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {(certs || []).map((cert) => (
              <tr key={cert.id} className="border-b border-brand-steel/50 hover:bg-brand-carbon/50">
                <td className="p-3">
                  <span className={`px-2 py-0.5 text-xs ${
                    cert.status === 'minted' ? 'bg-brand-red/20 text-brand-red' :
                    cert.status === 'claim_submitted' ? 'bg-brand-gold/20 text-brand-gold' :
                    'text-brand-muted'
                  }`}>
                    {cert.status?.toUpperCase()}
                  </span>
                </td>
                <td className="p-3 text-xs">{cert.wallet_type || '—'}</td>
                <td className="p-3 font-mono text-xs text-brand-muted">
                  {cert.wallet_address
                    ? cert.wallet_address.startsWith('CUSTODIAL:')
                      ? cert.wallet_address.replace('CUSTODIAL:', '')
                      : `${cert.wallet_address.slice(0, 6)}...${cert.wallet_address.slice(-4)}`
                    : '—'}
                </td>
                <td className="p-3 font-mono text-xs">{cert.token_id || '—'}</td>
                <td className="p-3">
                  {cert.status === 'claim_submitted' && (
                    <AdminClaimActions certId={cert.id} />
                  )}
                  {cert.status === 'minted' && cert.tx_hash && (
                    <a
                      href={`https://polygonscan.com/tx/${cert.tx_hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-red text-xs hover:underline"
                    >
                      View TX
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
