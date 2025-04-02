import { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import serverInstance from '@/shared/api/serverInstance';
import { refreshAccessToken } from '@/shared/utils/refreshAccessToken';

const globalForRefresh: {
  refreshTokenPromise: Promise<{
    accessToken: string;
    refreshToken: string;
  } | null> | null;
  isRefreshing: boolean;
  lastRefreshTime: number;
  cachedTokens?: {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
  };
  waitingRequests: {
    resolve: (response: NextResponse) => void;
    reject: (error: AxiosError) => void;
    req: NextRequest;
    isRetry: boolean;
    originalBody?: string;
  }[];
} = {
  refreshTokenPromise: null,
  isRefreshing: false,
  lastRefreshTime: 0,
  waitingRequests: [],
};

export async function GET(req: NextRequest) {
  return handleRequest(req);
}
export async function POST(req: NextRequest) {
  return handleRequest(req);
}
export async function DELETE(req: NextRequest) {
  return handleRequest(req);
}
export async function PATCH(req: NextRequest) {
  return handleRequest(req);
}
export async function PUT(req: NextRequest) {
  return handleRequest(req);
}

async function handleRequest(
  req: NextRequest,
  isRetry = false,
  originalBody?: string,
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
      return NextResponse.json(
        {
          error: '토큰 갱신에 실패했습니다.',
          status: 401,
          isRefreshError: true,
        },
        { status: 401 },
      );
    }
  }

  try {
    const response = await serverInstance.request({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}${req.nextUrl.pathname.replace('/api/server', '')}`,
      method: req.method,
      params: Object.fromEntries(req.nextUrl.searchParams.entries()),
      data: !['GET', 'DELETE', 'HEAD'].includes(req.method)
        ? JSON.parse(originalBody || (await req.text()) || '{}')
        : undefined,
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return response.status === 204
      ? new NextResponse(null, { status: 204 })
      : NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    const status = axiosError.response?.status || 500;

    if (status === 401 && !isRetry) {
      if (refreshToken) {
        if (globalForRefresh.isRefreshing) {
          return new Promise<NextResponse>((resolve, reject) => {
            globalForRefresh.waitingRequests.push({
              resolve,
              reject,
              req,
              isRetry: true,
              originalBody,
            });
          });
        } else {
          const newTokens = await performTokenRefresh(refreshToken);
          if (newTokens) {
            return retryRequest(req, newTokens.accessToken, originalBody);
          } else {
            cookieStore.delete('accessToken');
            cookieStore.delete('refreshToken');
            return NextResponse.json(
              {
                error: '토큰 갱신에 실패했습니다.',
                status: 401,
                isRefreshError: true,
              },
              { status: 401 },
            );
          }
        }
      } else {
        cookieStore.delete('accessToken');
        cookieStore.delete('refreshToken');
        return NextResponse.json(
          {
            error: '리프레시 토큰이 없습니다.',
            status: 401,
            isRefreshError: true,
          },
          { status: 401 },
        );
      }
    }

    return NextResponse.json(
      {
        error:
          axiosError.response?.data?.message ||
          '요청을 처리하는 중 오류가 발생했습니다.',
        status,
      },
      { status },
    );
  }
}

async function performTokenRefresh(
  refreshToken: string,
): Promise<{ accessToken: string; refreshToken: string } | null> {
  const now = Date.now();

  if (
    globalForRefresh.cachedTokens &&
    globalForRefresh.cachedTokens.expiresAt > now
  ) {
    return {
      accessToken: globalForRefresh.cachedTokens.accessToken,
      refreshToken: globalForRefresh.cachedTokens.refreshToken,
    };
  }

  if (globalForRefresh.isRefreshing && globalForRefresh.refreshTokenPromise) {
    return await globalForRefresh.refreshTokenPromise;
  }

  try {
    globalForRefresh.lastRefreshTime = now;
    globalForRefresh.isRefreshing = true;
    globalForRefresh.refreshTokenPromise = refreshAccessToken(refreshToken);

    const result = await globalForRefresh.refreshTokenPromise;
    if (result) {
      globalForRefresh.cachedTokens = {
        ...result,
        expiresAt: Date.now() + 10000,
      };
      await processWaitingRequests(result.accessToken);
    }
    return result;
  } catch (error) {
    rejectWaitingRequests(error as AxiosError);
    return null;
  } finally {
    globalForRefresh.isRefreshing = false;
    globalForRefresh.refreshTokenPromise = null;
  }
}

async function processWaitingRequests(accessToken: string) {
  const waitingRequests = [...globalForRefresh.waitingRequests];
  globalForRefresh.waitingRequests = [];

  for (const { resolve, reject, req, originalBody } of waitingRequests) {
    try {
      const response = await retryRequest(req, accessToken, originalBody);
      resolve(response);
    } catch (error) {
      reject(error as AxiosError);
    }
  }
}

function rejectWaitingRequests(error: AxiosError) {
  const waitingRequests = [...globalForRefresh.waitingRequests];
  globalForRefresh.waitingRequests = [];

  for (const { reject } of waitingRequests) {
    reject(error);
  }
}

async function retryRequest(
  req: NextRequest,
  accessToken: string,
  body?: string,
): Promise<NextResponse> {
  const newReq = new NextRequest(req.url, {
    method: req.method,
    headers: new Headers({
      ...Object.fromEntries(req.headers.entries()),
      Authorization: `Bearer ${accessToken}`,
    }),
    body,
  });

  return handleRequest(newReq, true, body);
}
