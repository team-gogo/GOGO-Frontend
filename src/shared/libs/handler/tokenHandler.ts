import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { deleteAuthCookies } from '../cookie/deleteCookies';
import { handleError } from './error';
import { parseRequestData, sendRequest } from './request';
import { createResponse } from './response';
import { getRefreshStateForUser, performTokenRefresh } from './token';

export async function tokenHandleRequest(
  req: NextRequest,
  isRetry = false,
  originalBody?: string | FormData,
): Promise<NextResponse> {
  const cookieStore = cookies();
  let accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) {
    const response = NextResponse.json(
      { error: 'Refresh token 없음', status: 401, isRefreshError: true },
      { status: 401 },
    );
    return deleteAuthCookies(response);
  }

  const refreshState = getRefreshStateForUser(refreshToken);

  if (refreshState.isRefreshing && !isRetry) {
    return new Promise<NextResponse>((resolve, reject) => {
      refreshState.waitingRequests.push({ resolve, reject, req, originalBody });
    });
  }

  if (!accessToken && !isRetry) {
    const newTokens = await performTokenRefresh(refreshToken, refreshState);
    if (newTokens) {
      accessToken = newTokens.accessToken;
    } else {
      const response = NextResponse.json(
        { error: '토큰 갱신 실패', status: 401, isRefreshError: true },
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
