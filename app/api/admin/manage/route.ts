import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase.ts/server'
import { getAdminClient } from '@/lib/supabase.ts/admin'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const formData = await request.formData()
    const action = formData.get('action') as string

    const adminClient = getAdminClient()

    if (action === 'create-drop') {
      const { error } = await adminClient.from('drops').insert({
        drop_number: parseInt(formData.get('drop_number') as string),
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        price_inr: parseInt(formData.get('price_inr') as string),
        total_units: parseInt(formData.get('total_units') as string) || 10,
        is_active: formData.get('is_active') === 'true',
      })

      if (error) return NextResponse.json({ error: error.message }, { status: 400 })
      return NextResponse.json({ success: true })
    }

    if (action === 'update-drop') {
      const id = formData.get('id') as string
      const { error } = await adminClient.from('drops').update({
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        price_inr: parseInt(formData.get('price_inr') as string),
        total_units: parseInt(formData.get('total_units') as string) || 10,
        is_active: formData.get('is_active') === 'true',
      }).eq('id', id)

      if (error) return NextResponse.json({ error: error.message }, { status: 400 })
      return NextResponse.json({ success: true })
    }

    if (action === 'create-product') {
      const { error } = await adminClient.from('products').insert({
        drop_id: formData.get('drop_id') as string || null,
        sku: formData.get('sku') as string,
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        price_inr: parseInt(formData.get('price_inr') as string),
        stock_total: parseInt(formData.get('stock_total') as string) || 10,
        stock_left: parseInt(formData.get('stock_total') as string) || 10,
        is_active: formData.get('is_active') === 'true',
        image_url: formData.get('image_url') as string || null,
      })

      if (error) return NextResponse.json({ error: error.message }, { status: 400 })
      return NextResponse.json({ success: true })
    }

    if (action === 'update-product') {
      const id = formData.get('id') as string
      const updates: Record<string, unknown> = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        price_inr: parseInt(formData.get('price_inr') as string),
        is_active: formData.get('is_active') === 'true',
      }
      const imageUrl = formData.get('image_url') as string
      if (imageUrl) updates.image_url = imageUrl

      const { error } = await adminClient.from('products').update(updates).eq('id', id)

      if (error) return NextResponse.json({ error: error.message }, { status: 400 })
      return NextResponse.json({ success: true })
    }

    if (action === 'upload-image') {
      const file = formData.get('file') as File
      if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

      const ext = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      const { data, error } = await adminClient.storage
        .from('product-images')
        .upload(fileName, file, {
          cacheControl: '31536000',
          contentType: file.type,
        })

      if (error) return NextResponse.json({ error: error.message }, { status: 400 })

      const { data: urlData } = adminClient.storage
        .from('product-images')
        .getPublicUrl(data.path)

      return NextResponse.json({ success: true, url: urlData.publicUrl })
    }

    if (action === 'update-seo') {
      const seoData = {
        site_title: formData.get('site_title') as string,
        site_description: formData.get('site_description') as string,
        og_image: formData.get('og_image') as string,
        keywords: formData.get('keywords') as string,
      }

      const { error } = await adminClient.from('site_settings').upsert(
        { key: 'seo', value: seoData },
        { onConflict: 'key' }
      )

      if (error) return NextResponse.json({ error: error.message }, { status: 400 })
      return NextResponse.json({ success: true })
    }

    if (action === 'invite-waitlist') {
      const id = formData.get('id') as string
      const dropAccess = parseInt(formData.get('drop_access') as string)

      const { error } = await adminClient.from('waitlist').update({
        invited: true,
        drop_access: dropAccess,
      }).eq('id', id)

      if (error) return NextResponse.json({ error: error.message }, { status: 400 })
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
  } catch (error) {
    console.error('Admin manage error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
