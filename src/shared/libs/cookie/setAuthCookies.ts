import { cookies } from 'next/headers';

export function setAuthCookies(accessToken: string, refreshToken: string) {
  const cookieStore = cookies();

  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: Number.MAX_SAFE_INTEGER,
  });

  cookieStore.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: Number.MAX_SAFE_INTEGER,
  });
}
