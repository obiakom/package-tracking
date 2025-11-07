import { RateLimiter } from 'limiter';

// Create a rate limiter: 100 requests per IP per minute
const limiter = new RateLimiter({
  tokensPerInterval: 100,
  interval: 'minute',
  fireImmediately: true
});

// Store IP-specific limiters
const ipLimiters = new Map<string, RateLimiter>();

export async function rateLimit(ip: string): Promise<boolean> {
  // Get or create limiter for this IP
  if (!ipLimiters.has(ip)) {
    ipLimiters.set(ip, new RateLimiter({
      tokensPerInterval: 100,
      interval: 'minute',
      fireImmediately: true
    }));
  }

  const ipLimiter = ipLimiters.get(ip)!;
  const remainingRequests = await ipLimiter.removeTokens(1);
  
  return remainingRequests >= 0;
}