import { cookies } from 'next/headers';

export function clearAuthCookies() {
  const cookieStore = cookies();
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
}
