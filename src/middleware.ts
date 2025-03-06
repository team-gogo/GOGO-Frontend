import axios from 'axios';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const code = request.nextUrl.searchParams.get('code');

  if (!code) return response;

  const data = new URLSearchParams();
  data.append('code', code);
  data.append('client_id', `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`);
  data.append(
    'client_secret',
    `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET}`,
  );
  data.append('redirect_uri', `${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}`);
  data.append('grant_type', 'authorization_code');

  const tokenInfo = await postToken(data);

  if (!tokenInfo)
    return NextResponse.redirect(new URL('/signin', request.nextUrl));
}

const postToken = async (data: URLSearchParams) => {
  try {
    const tokenInfo = await axios.post<{ data: { access_token: string } }>(
      'https://oauth2.googleapis.com/token',
      data,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );
    return tokenInfo;
  } catch {
    return null;
  }
};

export const config = {
  matcher: '/signup',
};
