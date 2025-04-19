import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { deleteAuthCookies } from '@/shared/libs/cookie/deleteCookies';
import { handleError } from './error';
import { parseRequestData, sendRequest } from './request';
import { createResponse } from './response';
import { globalForRefresh, performTokenRefresh } from './token';

export async function tokenHandleRequest(
  req: NextRequest,
  isRetry = false,
  originalBody?: string | FormData,
): Promise<NextResponse> {
  const cookieStore = cookies();
  let accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (
    globalForRefresh.cachedTokens &&
    globalForRefresh.cachedTokens.expiresAt > Date.now()
  ) {
    accessToken = globalForRefresh.cachedTokens.accessToken;
  }

  if (!accessToken && refreshToken && !isRetry) {
    const newTokens = await performTokenRefresh(refreshToken);
    if (newTokens) {
      accessToken = newTokens.accessToken;
    } else {
      const response = NextResponse.json(
        {
          error: '토큰 갱신에 실패했습니다.',
          status: 401,
          isRefreshError: true,
        },
        { status: 401 },
      );
      return deleteAuthCookies(response);
    }
  }

  try {
    const { requestData, headers } = await parseRequestData(req, originalBody);

    const response = await sendRequest(req, accessToken, requestData, headers);

    return createResponse(response);
  } catch (error) {
    return handleError(error, req, isRetry, refreshToken, originalBody);
  }
}
