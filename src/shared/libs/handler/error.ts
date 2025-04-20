import { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { deleteAuthCookies } from '@/shared/libs/cookie/deleteCookies';
import { retryRequest } from './request';
import { createErrorResponse } from './response';
import { performTokenRefresh, getRefreshStateForUser } from './token';

export async function handleError(
  error: unknown,
  req: NextRequest,
  isRetry: boolean,
  refreshToken: string | undefined,
  originalBody?: string | FormData,
): Promise<NextResponse> {
  const axiosError = error as AxiosError<{ message: string }>;
  const status = axiosError.response?.status || 500;

  if (status === 401 && !isRetry) {
    return handleTokenError(req, refreshToken, originalBody);
  }

  return createErrorResponse(
    axiosError.response?.data?.['message'] ||
      '요청을 처리하는 중 오류가 발생했습니다.',
    status,
  );
}

async function handleTokenError(
  req: NextRequest,
  refreshToken: string | undefined,
  originalBody?: string | FormData,
): Promise<NextResponse> {
  if (!refreshToken) {
    const response = createErrorResponse(
      '토큰 갱신에 실패했습니다.',
      401,
      true,
    );
    return deleteAuthCookies(response);
  }

  const refreshState = getRefreshStateForUser(refreshToken);

  if (refreshState.isRefreshing) {
    return new Promise<NextResponse>((resolve, reject) => {
      refreshState.waitingRequests.push({
        resolve,
        reject,
        req,
        originalBody,
      });
    });
  }

  const newTokens = await performTokenRefresh(refreshToken, refreshState);
  if (newTokens) {
    return retryRequest(req, newTokens.accessToken, originalBody);
  } else {
    const response = createErrorResponse(
      '토큰 갱신에 실패했습니다.',
      401,
      true,
    );
    return deleteAuthCookies(response);
  }
}
