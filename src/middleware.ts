import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');

  if (!code) {
    return NextResponse.next();
  }

  const callbackUrl = new URL('/api/auth/callback', request.nextUrl.origin);
  callbackUrl.searchParams.set('code', code);

  return NextResponse.redirect(callbackUrl);
}

export const config = {
  matcher: '/signup',
};
