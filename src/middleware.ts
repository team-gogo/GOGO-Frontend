import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  if (code) {
    const callbackUrl = new URL('/api/signin', request.nextUrl.origin);
    callbackUrl.searchParams.set('code', code);
    return NextResponse.redirect(callbackUrl);
  }

  const publicPaths = ['/signin', '/callback'];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  if (!isPublicPath && !accessToken && !refreshToken) {
    // return NextResponse.redirect(new URL('/signin', request.url));
  }

  if (isPublicPath && accessToken && refreshToken) {
    return NextResponse.redirect(new URL('/stage', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/callback',
    '/signup',
    '/stage',
    '/community/:path*',
    '/mini-game/:path*',
    '/stage/:path*',
    '/team/:path*',
    '/faq',
    '/match/:path*',
    '/my/:path*',
    '/ranking/:path*',
    '/signin',
  ],
};
