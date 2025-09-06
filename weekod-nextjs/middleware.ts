import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';
  
  // Handle direct IP access - redirect to weekod.in
  if (hostname.match(/^\d+\.\d+\.\d+\.\d+/) || hostname === '216.198.79.1') {
    url.hostname = 'weekod.in';
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }
  
  // Redirect www to non-www for consistency
  if (hostname.startsWith('www.')) {
    url.hostname = hostname.replace(/^www\./, '');
    return NextResponse.redirect(url, 301);
  }
  
  // Force HTTPS in production (skip for localhost)
  if (url.protocol === 'http:' && !hostname.includes('localhost') && !hostname.includes('127.0.0.1')) {
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }
  
  // Add security and SEO headers
  const response = NextResponse.next();
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // Add canonical URL header for SEO (only in production)
  if (!hostname.includes('localhost') && !hostname.includes('127.0.0.1')) {
    const canonicalUrl = `https://${hostname.replace(/^www\./, '')}${url.pathname}`;
    response.headers.set('Link', `<${canonicalUrl}>; rel="canonical"`);
  }
  
  // Add hreflang for international SEO
  response.headers.set('Content-Language', 'en-US');
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|_next/webpack-hmr|favicon.ico|sitemap.xml|robots.txt|manifest.json).*)',
  ],
};