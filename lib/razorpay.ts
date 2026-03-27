import crypto from 'node:crypto'
import Razorpay from 'razorpay'

export function getRazorpayClient() {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  if (!keyId || !keySecret) {
    throw new Error('Missing Razorpay credentials')
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  })
}

export function verifyRazorpayWebhookSignature(payload: string, signature: string) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET
  if (!secret) {
    throw new Error('Missing RAZORPAY_WEBHOOK_SECRET')
  }

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex')

  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature),
    Buffer.from(signature)
  )
}
