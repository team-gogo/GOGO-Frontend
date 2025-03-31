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
} = {
  refreshTokenPromise: null,
  isRefreshing: false,
  lastRefreshTime: 0,
};

const MIN_REFRESH_INTERVAL = 10000;

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

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${req.nextUrl.pathname.replace('/api/server', '')}`;
  const method = req.method;
  const params = Object.fromEntries(req.nextUrl.searchParams.entries());
  const requestId = Math.random().toString(36).substring(7);

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
            error: '인증이 필요합니다.',
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
        const newTokens = await performTokenRefresh(refreshToken);

        if (newTokens) {
          accessToken = newTokens.accessToken;
          return retryRequest(
            req,
            accessToken,
            requestId,
            originalBody || (data ? JSON.stringify(data) : undefined),
          );
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
  const currentTime = Date.now();

  if (currentTime - globalForRefresh.lastRefreshTime < MIN_REFRESH_INTERVAL) {
    const cookieStore = cookies();
    const currentAccessToken = cookieStore.get('accessToken')?.value;
    const currentRefreshToken = cookieStore.get('refreshToken')?.value;

    if (currentAccessToken && currentRefreshToken) {
      return {
        accessToken: currentAccessToken,
        refreshToken: currentRefreshToken,
      };
    }
  }

  if (globalForRefresh.isRefreshing && globalForRefresh.refreshTokenPromise) {
    return await globalForRefresh.refreshTokenPromise;
  }

  globalForRefresh.isRefreshing = true;
  globalForRefresh.refreshTokenPromise = refreshAccessToken(refreshToken);

  try {
    const result = await globalForRefresh.refreshTokenPromise;
    globalForRefresh.lastRefreshTime = Date.now();
    return result;
  } finally {
    globalForRefresh.isRefreshing = false;
    globalForRefresh.refreshTokenPromise = null;
  }
}

async function retryRequest(
  req: NextRequest,
  accessToken: string,
  requestId: string,
  body?: string,
): Promise<NextResponse> {
  console.log(`[${requestId}] 새 토큰으로 요청 재시도 중...`);

  const newReq = new NextRequest(req.url, {
    method: req.method,
    headers: new Headers(req.headers),
    body: body,
  });

  return handleRequest(newReq, true, body);
}
