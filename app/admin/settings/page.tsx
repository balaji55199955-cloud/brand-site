import { adminSupabase } from '@/lib/supabase/admin'
import { CreateDropForm, CreateProductForm, SeoForm } from '../forms'

export const dynamic = 'force-dynamic'

export default async function AdminSettingsPage() {
  

  const { data: drops } = await adminSupabase
    .from('drops')
    .select('id, name, drop_number')
    .order('drop_number', { ascending: true })

  const { data: seoRow } = await adminSupabase
    .from('site_settings')
    .select('value')
    .eq('key', 'seo')
    .maybeSingle()

  const seo = (seoRow?.value as Record<string, string>) || {}

  return (
    <div>
      <h1 className="font-display text-2xl font-black mb-8">Settings &amp; Management</h1>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <CreateDropForm />
        <CreateProductForm drops={(drops || []).map(d => ({ id: d.id, name: d.name }))} />
      </div>

      <SeoForm current={seo} />
    </div>
  )
}
