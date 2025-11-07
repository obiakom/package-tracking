import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get response
  const response = NextResponse.next();

  // Add security headers
  const headers = response.headers;

  // CORS headers
  headers.set('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Security headers
  headers.set('X-DNS-Prefetch-Control', 'on');
  headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  headers.set('X-Frame-Options', 'SAMEORIGIN');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'origin-when-cross-origin');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Content Security Policy
  headers.set(
    'Content-Security-Policy',
    `default-src 'self';` +
    `script-src 'self' 'unsafe-eval' 'unsafe-inline';` +
    `style-src 'self' 'unsafe-inline';` +
    `img-src 'self' blob: data:;` +
    `font-src 'self';` +
    `connect-src 'self' ${process.env.API_URL || ''};`
  );

  return response;
}

// Only run middleware on API routes
export const config = {
  matcher: '/api/:path*',
};