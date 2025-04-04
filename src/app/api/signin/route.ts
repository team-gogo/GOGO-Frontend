import axios from 'axios';
import { NextResponse } from 'next/server';
import serverInstance from '@/shared/api/serverInstance';
import { setAuthCookies } from '@/shared/utils/setAuthCookies';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    if (!code) {
      throw new Error('Authorization code not found');
    }

    const data = new URLSearchParams();
    data.append('code', code);
    data.append('client_id', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '');
    data.append(
      'client_secret',
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || '',
    );
    data.append(
      'redirect_uri',
      process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || '',
    );
    data.append('grant_type', 'authorization_code');

    const tokenResponse = await axios.post<{ access_token: string }>(
      'https://oauth2.googleapis.com/token',
      data,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );

    const googleAccessToken = tokenResponse.data.access_token;
    const backendResponse = await serverInstance.post('/user/auth/login', {
      oauthToken: googleAccessToken,
    });
    if (backendResponse.status !== 200) {
      throw new Error('Backend authentication failed');
    }

    const { accessToken, refreshToken, authority } = backendResponse.data;

    setAuthCookies(accessToken, refreshToken);

    if (authority === 'UNAUTHENTICATED') {
      return NextResponse.redirect(new URL('/signup', request.url));
    }

    return NextResponse.redirect(new URL('/stage', request.url));
  } catch (error) {
    console.error('❌ Login Failed:', error);
    return NextResponse.redirect(new URL('/signin', request.url));
  }
}
