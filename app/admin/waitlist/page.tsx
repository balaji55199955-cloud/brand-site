import { getAdminClient } from '@/lib/supabase.ts/admin'

export const dynamic = 'force-dynamic'

export default async function AdminWaitlistPage() {
  const adminClient = getAdminClient()

  const { data: waitlist } = await adminClient
    .from('waitlist')
    .select('id, email, position, invited, drop_access, created_at')
    .order('position', { ascending: true })
    .limit(200)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-black">Waitlist</h1>
        <p className="serial-number">{waitlist?.length ?? 0} entries</p>
      </div>

      <div className="border border-brand-steel overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-brand-steel bg-brand-carbon">
              <th className="text-left p-3 text-brand-muted font-mono text-xs">#</th>
              <th className="text-left p-3 text-brand-muted font-mono text-xs">EMAIL</th>
              <th className="text-left p-3 text-brand-muted font-mono text-xs">INVITED</th>
              <th className="text-left p-3 text-brand-muted font-mono text-xs">DROP ACCESS</th>
              <th className="text-left p-3 text-brand-muted font-mono text-xs">JOINED</th>
            </tr>
          </thead>
          <tbody>
            {(waitlist || []).map((entry) => (
              <tr key={entry.id} className="border-b border-brand-steel/50 hover:bg-brand-carbon/50">
                <td className="p-3 font-mono text-brand-muted">{entry.position}</td>
                <td className="p-3">{entry.email}</td>
                <td className="p-3">
                  <span className={entry.invited ? 'text-brand-red' : 'text-brand-muted'}>
                    {entry.invited ? 'YES' : 'NO'}
                  </span>
                </td>
                <td className="p-3 font-mono">{entry.drop_access ?? '—'}</td>
                <td className="p-3 text-brand-muted text-xs">
                  {new Date(entry.created_at).toLocaleDateString('en-IN')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
