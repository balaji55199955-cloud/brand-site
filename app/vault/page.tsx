import { getAdminClient } from '@/lib/supabase.ts/admin'

export const dynamic = 'force-dynamic'

type Product = {
  id: string
  sku: string
  name: string
  description: string | null
  stock_total: number
}

type Drop = {
  id: string
  drop_number: number
  name: string
}

export default async function VaultPage() {
  const adminClient = getAdminClient()

  const { data: products } = await adminClient
    .from('products')
    .select('id, sku, name, description, stock_total, drop_id')
    .order('created_at', { ascending: false })

  const { data: drops } = await adminClient
    .from('drops')
    .select('id, drop_number, name')
    .order('drop_number', { ascending: true })

  const totalPieces = (products || []).reduce((sum, p) => sum + (p.stock_total || 10), 0)
  const dropsCompleted = (drops || []).length

  return (
    <main className="min-h-screen bg-brand-black text-brand-white">
      <header className="border-b border-brand-red px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display font-black text-4xl md:text-5xl mb-3">
            [BRAND] VAULT
          </h1>
          <p className="text-brand-muted text-sm max-w-lg">
            Every piece ever made. Verified on-chain. Publicly traceable.
          </p>
        </div>
      </header>

      <section className="px-6 py-8 border-b border-brand-steel">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-8">
          <Stat label="Total Pieces Produced" value={String(totalPieces)} />
          <Stat label="Drops Completed" value={String(dropsCompleted)} />
          <Stat label="Pieces in Circulation" value={String(totalPieces)} />
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {(products as Product[] | null)?.length ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {(products as Product[]).map((product) => (
                <a
                  key={product.id}
                  href={`/verify?code=${product.sku}`}
                  className="border border-brand-steel bg-brand-carbon p-4 hover:border-brand-red transition-colors group"
                >
                  <div className="aspect-square bg-brand-black flex items-center justify-center mb-3">
                    <span className="font-display text-brand-muted text-xs group-hover:text-brand-red transition-colors">
                      [BRAND]
                    </span>
                  </div>
                  <p className="serial-number">{product.sku}</p>
                  <p className="text-brand-muted text-xs mt-1">{product.name}</p>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-brand-muted text-center py-12">
              No pieces in the vault yet. First drop coming soon.
            </p>
          )}
        </div>
      </section>

      <section className="px-6 py-8 border-t border-brand-steel">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-brand-muted text-sm">
            Can&apos;t find your piece? Tap the NFC chip on your garment to verify.
          </p>
          <a
            href="/verify"
            className="inline-block mt-3 text-brand-red text-sm hover:underline"
          >
            Go to verification page
          </a>
        </div>
      </section>
    </main>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-display font-bold text-2xl">{value}</p>
      <p className="serial-number mt-1">{label}</p>
    </div>
  )
}
