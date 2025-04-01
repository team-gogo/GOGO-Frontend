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

export async function GET(req: NextRequest): Promise<NextResponse> {
  return handleRequest(req);
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  return handleRequest(req);
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  return handleRequest(req);
}

export async function PATCH(req: NextRequest): Promise<NextResponse> {
  return handleRequest(req);
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
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

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${req.nextUrl.pathname.replace('/api/server', '')}`;
  const method = req.method;
  const params = Object.fromEntries(req.nextUrl.searchParams.entries());

  let data;
  if (!['GET', 'DELETE', 'HEAD'].includes(method)) {
    try {
      const textBody = originalBody || (await req.text());
      data = textBody ? JSON.parse(textBody) : undefined;
    } catch (error) {
      return NextResponse.json(
        { error: '잘못된 JSON 형식입니다.', status: 400 },
        { status: 400 },
      );
    }
  }

  try {
    if (!accessToken && refreshToken && !isRetry) {
      const newTokens = await performTokenRefresh(refreshToken);
      if (newTokens) {
        accessToken = newTokens.accessToken;
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

    const response = await serverInstance.request({
      url,
      method,
      params,
      data,
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (response.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    const status = axiosError.response?.status || 500;

    if (status === 401 && !isRetry) {
      if (refreshToken) {
        if (globalForRefresh.isRefreshing) {
          globalForRefresh.waitingRequests.push({
            req,
            isRetry: true,
            originalBody,
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

async function performTokenRefresh(refreshToken: string): Promise<{
  accessToken: string;
  refreshToken: string;
} | null> {
  const now = Date.now();

  if (
    globalForRefresh.cachedTokens &&
    globalForRefresh.cachedTokens.expiresAt > now
  ) {
    return globalForRefresh.cachedTokens;
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
        expiresAt: Date.now() + 1000,
      };
      await processWaitingRequests();
    }
    return result;
  } finally {
    globalForRefresh.isRefreshing = false;
    globalForRefresh.refreshTokenPromise = null;
  }
}

async function processWaitingRequests() {
  while (globalForRefresh.waitingRequests.length > 0) {
    const { req, isRetry, originalBody } =
      globalForRefresh.waitingRequests.shift()!;
    await handleRequest(req, isRetry, originalBody);
  }
}

async function retryRequest(
  req: NextRequest,
  accessToken: string,
  body?: string,
): Promise<NextResponse> {
  const newReq = new NextRequest(req.url, {
    method: req.method,
    headers: new Headers(req.headers),
    body: body,
  });
  return handleRequest(newReq, true, body);
}
