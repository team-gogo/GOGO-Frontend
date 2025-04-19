import { NextResponse } from 'next/server';

export function deleteAuthCookies(response: NextResponse) {
  response.cookies.set('accessToken', '', {
    path: '/',
    httpOnly: true,
    expires: new Date(0),
  });

  response.cookies.set('refreshToken', '', {
    path: '/',
    httpOnly: true,
    expires: new Date(0),
  });
  return response;
}
