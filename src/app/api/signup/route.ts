import { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import serverInstance from '@/shared/api/serverInstance';
import { clearAuthCookies } from '@/shared/utils/clearAuthCookies';
import { refreshAccessToken } from '@/shared/utils/refreshAccessToken';
import { setAuthCookies } from '@/shared/utils/setAuthCookies';

export async function POST(request: Request) {
  const cookieStore = cookies();
  let accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;
  const body = await request.json();

  try {
    const response = await serverInstance.post('/user/auth/signup', body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      response.data;

    setAuthCookies(newAccessToken, newRefreshToken);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    const status = axiosError.response?.status || 500;

    if (status === 401) {
      if (!refreshToken) {
        clearAuthCookies();
        return NextResponse.json(
          {
            error: 'No refresh token available',
            status: 401,
            isRefreshError: true,
          },
          { status: 401 },
        );
      }

      const newTokens = await refreshAccessToken(refreshToken);

      if (newTokens) {
        accessToken = newTokens.accessToken;

        const retryResponse = await serverInstance.post(
          '/user/auth/signup',
          body,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          retryResponse.data;

        setAuthCookies(newAccessToken, newRefreshToken);

        return NextResponse.json(retryResponse.data, {
          status: retryResponse.status,
        });
      } else {
        clearAuthCookies();
        return NextResponse.json(
          { error: 'Token refresh failed', status: 401, isRefreshError: true },
          { status: 401 },
        );
      }
    }

    return NextResponse.json(
      {
        error: axiosError.response?.data?.message || '회원가입에 실패했습니다.',
        status,
      },
      { status },
    );
  }
}
