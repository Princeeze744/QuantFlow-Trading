// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

interface RateLimitConfig {
  maxRequests: number
  windowMs: number
}

export function rateLimit(
  identifier: string,
  config: RateLimitConfig = { maxRequests: 10, windowMs: 60000 }
): { success: boolean; remaining: number; resetIn: number } {
  const now = Date.now()
  const record = rateLimitMap.get(identifier)

  // Clean up old entries periodically
  if (rateLimitMap.size > 10000) {
    const cutoff = now - config.windowMs
    for (const [key, value] of rateLimitMap.entries()) {
      if (value.resetTime < cutoff) {
        rateLimitMap.delete(key)
      }
    }
  }

  if (!record || now > record.resetTime) {
    // First request or window expired
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + config.windowMs
    })
    return {
      success: true,
      remaining: config.maxRequests - 1,
      resetIn: config.windowMs
    }
  }

  if (record.count >= config.maxRequests) {
    // Rate limit exceeded
    return {
      success: false,
      remaining: 0,
      resetIn: record.resetTime - now
    }
  }

  // Increment count
  record.count++
  rateLimitMap.set(identifier, record)

  return {
    success: true,
    remaining: config.maxRequests - record.count,
    resetIn: record.resetTime - now
  }
}

// Helper to get client IP
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown'
  return ip
}