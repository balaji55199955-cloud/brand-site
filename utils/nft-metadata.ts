import { adminSupabase } from '@/lib/supabase/admin'
import { sendNFTDeliveryEmail } from '@/lib/resend'

export async function mintNFT(orderId: string): Promise<{ crossmintId: string }> {
  // ── 1. Idempotency check ──────────────────────────────────
  const { data: existing } = await adminSupabase
    .from('nft_certificates')
    .select('id, crossmint_id, status')
    .eq('order_id', orderId)
    .single()

  if (existing && existing.status === 'minted') {
    return { crossmintId: existing.crossmint_id! }
  }

  // ── 2. Fetch order details ────────────────────────────────
  const { data: order, error } = await adminSupabase
    .from('orders')
    .select(`
      id, user_id,
      product:products(name, images, description),
      drop:drops(name, total_supply, drop_date)
    `)
    .eq('id', orderId)
    .eq('status', 'paid')
    .single()

  if (error || !order) throw new Error(`Order ${orderId} not found or not paid`)

  const { data: user } = await adminSupabase
    .from('users').select('email').eq('id', order.user_id).single()
  if (!user) throw new Error('User not found')

  const product = (order.product as any)
  const drop = (order.drop as any)

  // ── 3. Build NFT metadata ─────────────────────────────────
  const metadata = {
    name: `${drop.name} — ${product.name}`,
    description: `Phygital luxury streetwear. Motorsport soul, luxury surface. ${product.description ?? ''}`.trim(),
    image: product.images?.[0] ?? '',
    attributes: [
      { trait_type: 'Drop', value: drop.name },
      { trait_type: 'Collection Size', value: `${drop.total_supply} pieces` },
      { trait_type: 'Tier', value: 'Verified Owner' },
      { trait_type: 'Blockchain', value: 'Polygon' },
      { trait_type: 'Mint Year', value: new Date().getFullYear() },
    ],
  }

  // ── 4. Create pending certificate record ──────────────────
  const contractAddress = process.env.NFT_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000'
  const metadataUri = `https://api.${process.env.NEXT_PUBLIC_SITE_URL?.replace('https://', '')}/metadata/${orderId}`
  // NOTE: In production, pin metadata to IPFS first, use ipfs:// URI

  if (!existing) {
    await adminSupabase.from('nft_certificates').insert({
      order_id: orderId,
      contract_address: contractAddress,
      chain: 'polygon',
      metadata_uri: metadataUri,
      status: 'minting',
    })
  } else {
    await adminSupabase
      .from('nft_certificates')
      .update({ status: 'minting' })
      .eq('order_id', orderId)
  }

  // ── 5. Call Crossmint minting API ─────────────────────────
  const crossmintEnv = process.env.CROSSMINT_ENV === 'production'
    ? 'www' : 'staging'

  const mintRes = await fetch(
    `https://${crossmintEnv}.crossmint.com/api/2022-06-09/collections/${process.env.CROSSMINT_COLLECTION_ID}/nfts`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': process.env.CROSSMINT_API_KEY || 'mock_key',
      },
      body: JSON.stringify({
        recipient: `email:${user.email}:polygon`,
        metadata,
      }),
    }
  )

  if (!mintRes.ok) {
    const errText = await mintRes.text()
    await adminSupabase
      .from('nft_certificates')
      .update({ status: 'failed' })
      .eq('order_id', orderId)
    throw new Error(`Crossmint API error: ${errText}`)
  }

  const mintData = await mintRes.json()
  const crossmintId = mintData.id

  // ── 6. Update certificate with Crossmint ID ───────────────
  await adminSupabase
    .from('nft_certificates')
    .update({
      crossmint_id: crossmintId,
      status: 'minted',
      minted_at: new Date().toISOString(),
    })
    .eq('order_id', orderId)

  // ── 7. Upgrade user tier to 'verified' ────────────────────
  await adminSupabase
    .from('users')
    .update({ tier: 'verified' })
    .eq('id', order.user_id)
    .eq('tier', 'core')  // Only upgrade if still core

  await adminSupabase
    .from('tier_memberships')
    .upsert({
      user_id: order.user_id,
      tier: 'verified',
      granted_at: new Date().toISOString(),
    }, { onConflict: 'user_id' })

  // ── 8. Send NFT delivery email ────────────────────────────
  sendNFTDeliveryEmail(orderId).catch(console.error)

  return { crossmintId }
}
