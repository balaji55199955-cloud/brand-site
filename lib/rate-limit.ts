/**
 * Simple in-memory rate limiter for development/low-traffic use.
 * For production, use @vercel/functions rate limiter or Upstash Redis.
 */

const store = new Map<string, { count: number; resetAt: number }>()

interface RateLimitConfig {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Max requests per window
}

export function createRateLimiter(config: RateLimitConfig) {
  const { windowMs, maxRequests } = config

  return function rateLimit(key: string): { allowed: boolean; remaining: number; resetAt: number } {
    const now = Date.now()
    const entry = store.get(key)

    if (!entry || now > entry.resetAt) {
      // New window
      store.set(key, { count: 1, resetAt: now + windowMs })
      return { allowed: true, remaining: maxRequests - 1, resetAt: now + windowMs }
    }

    if (entry.count >= maxRequests) {
      // Rate limited
      return { allowed: false, remaining: 0, resetAt: entry.resetAt }
    }

    // Increment count
    entry.count++
    store.set(key, entry)
    return { allowed: true, remaining: maxRequests - entry.count, resetAt: entry.resetAt }
  }
}

// Pre-configured limiters for different endpoints
export const waitlistLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 5, // 5 requests per hour per IP
})

export const nfcVerifyLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 10, // 10 requests per minute per IP
})

export const productsLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 30, // 30 requests per minute per IP
})

// Cleanup old entries every hour to prevent memory leak
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of store.entries()) {
      if (now > entry.resetAt) {
        store.delete(key)
      }
    }
  }, 60 * 60 * 1000)
}
