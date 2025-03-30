import { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import instance from '@/shared/api/instance';

const globalForRefresh = global as unknown as {
  refreshTokenPromise: Promise<{
    accessToken: string;
    refreshToken: string;
  } | null> | null;
  isRefreshing: boolean;
  refreshTimestamp: number;
};

if (!globalForRefresh.isRefreshing) {
  globalForRefresh.isRefreshing = false;
}
if (!globalForRefresh.refreshTokenPromise) {
  globalForRefresh.refreshTokenPromise = null;
}
if (!globalForRefresh.refreshTimestamp) {
  globalForRefresh.refreshTimestamp = 0;
}

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
    const response = await instance.request({
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

    if (status === 401 && !isRetry && refreshToken) {
      const now = Date.now();

      const recentRefresh = now - globalForRefresh.refreshTimestamp < 1000;

      if (globalForRefresh.isRefreshing || recentRefresh) {
        if (globalForRefresh.refreshTokenPromise) {
          const newTokens = await globalForRefresh.refreshTokenPromise;

          if (newTokens) {
            accessToken = newTokens.accessToken;

            cookies().set('accessToken', accessToken, {
              httpOnly: true,
              secure: true,
              sameSite: 'lax',
              maxAge: Number.MAX_SAFE_INTEGER,
            });
            return retryRequest(
              req,
              accessToken,
              requestId,
              originalBody || JSON.stringify(data),
            );
          } else {
            cookieStore.delete('accessToken');
            cookieStore.delete('refreshToken');
            return NextResponse.redirect(new URL('/signin', req.url));
          }
        }

        if (recentRefresh && !globalForRefresh.refreshTokenPromise) {
          accessToken = cookies().get('accessToken')?.value || '';

          return retryRequest(
            req,
            accessToken,
            requestId,
            originalBody || JSON.stringify(data),
          );
        }
      }

      globalForRefresh.isRefreshing = true;
      globalForRefresh.refreshTimestamp = now;
      globalForRefresh.refreshTokenPromise = refreshAccessToken(refreshToken);

      try {
        const newTokens = await globalForRefresh.refreshTokenPromise;

        if (newTokens) {
          accessToken = newTokens.accessToken;

          cookies().set('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: Number.MAX_SAFE_INTEGER,
          });
          return retryRequest(
            req,
            accessToken,
            requestId,
            originalBody || JSON.stringify(data),
          );
        } else {
          cookieStore.delete('accessToken');
          cookieStore.delete('refreshToken');
          return NextResponse.redirect(new URL('/signin', req.url));
        }
      } finally {
        globalForRefresh.isRefreshing = false;
        globalForRefresh.refreshTokenPromise = null;
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

async function refreshAccessToken(
  refreshToken: string,
): Promise<{ accessToken: string; refreshToken: string } | null> {
  try {
    const response = await instance.post('/user/auth/refresh', null, {
      headers: { 'Refresh-Token': refreshToken },
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    cookies().set('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: Number.MAX_SAFE_INTEGER,
    });

    cookies().set('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: Number.MAX_SAFE_INTEGER,
    });

    return { accessToken, refreshToken: newRefreshToken };
  } catch (error) {
    return null;
  }
}

async function retryRequest(
  req: NextRequest,
  accessToken: string,
  requestId: string,
  body?: string,
): Promise<NextResponse> {
  const newReq = new NextRequest(req.url, {
    method: req.method,
    headers: new Headers(req.headers),
    body: body,
  });
  newReq.headers.set('Authorization', `Bearer ${accessToken}`);
  return handleRequest(newReq, true, body);
}
