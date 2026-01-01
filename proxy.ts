import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  // Check for Better Auth session cookie
  const sessionCookie = request.cookies.get('better-auth.session_token');

  if (!sessionCookie) {
    const signInUrl = new URL('/sign-in', request.url);
    signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Match all routes under (main) group - these are the actual URL paths
  matcher: ['/dashboard/:path*', '/inventory/:path*', '/audit/:path*', '/storefront/:path*'],
};
