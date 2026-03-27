import { Resend } from 'resend'

const resendApiKey = process.env.RESEND_API_KEY

export const resend = resendApiKey ? new Resend(resendApiKey) : null

export async function sendOrderConfirmationEmail(email: string, orderId: string) {
  if (!resend) return

  const from = process.env.FROM_EMAIL || 'onboarding@resend.dev'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  await resend.emails.send({
    from,
    to: email,
    subject: '[BRAND] Order confirmed',
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6">
        <h2>[BRAND] order confirmed</h2>
        <p>Your payment was verified and your ownership certificate is being prepared.</p>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p>Track status in your dashboard:</p>
        <p><a href="${siteUrl}/dashboard">${siteUrl}/dashboard</a></p>
      </div>
    `,
  })
}
