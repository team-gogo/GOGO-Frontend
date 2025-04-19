import { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { deleteAuthCookies } from '@/shared/libs/cookie/deleteCookies';
import { setAuthCookies } from '@/shared/libs/cookie/setAuthCookies';
import { refreshAccessToken } from '@/shared/libs/handler/refreshAccessToken';
import serverInstance from '@/shared/libs/http/serverInstance';

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
        const response = NextResponse.json(
          {
            error: 'No refresh token available',
            status: 401,
            isRefreshError: true,
          },
          { status: 401 },
        );
        return deleteAuthCookies(response);
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
        const response = NextResponse.json(
          { error: 'Token refresh failed', status: 401, isRefreshError: true },
          { status: 401 },
        );
        return deleteAuthCookies(response);
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
