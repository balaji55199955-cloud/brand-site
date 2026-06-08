import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key')

export async function sendPurchaseConfirmEmail(orderId: string, userId: string) {
  const { adminSupabase } = await import('@/lib/supabase/admin')

  const { data: order } = await adminSupabase
    .from('orders')
    .select(`*, product:products(*), drop:drops(*)`)
    .eq('id', orderId)
    .single()

  const { data: user } = await adminSupabase
    .from('users').select('email').eq('id', userId).single()

  if (!order || !user) return

  const { PurchaseConfirmEmail } = await import('@/emails/PurchaseConfirm')
  const { render } = await import('@react-email/render')

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
    to: user.email,
    subject: `Order Confirmed — ${order.drop.name}`,
    html: await render(PurchaseConfirmEmail({ order })),
  })
}

export async function sendNFTDeliveryEmail(orderId: string) {
  const { adminSupabase } = await import('@/lib/supabase/admin')

  const { data: cert } = await adminSupabase
    .from('nft_certificates')
    .select(`*, order:orders(user_id, drop:drops(name))`)
    .eq('order_id', orderId)
    .single()

  if (!cert) return

  const { data: user } = await adminSupabase
    .from('users').select('email').eq('id', cert.order.user_id).single()

  if (!user) return

  const { NFTDeliveryEmail } = await import('@/emails/NFTDelivery')
  const { render } = await import('@react-email/render')

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
    to: user.email,
    subject: `Your NFT Certificate is Ready — ${cert.order.drop.name}`,
    html: await render(NFTDeliveryEmail({ certificate: cert })),
  })
}
