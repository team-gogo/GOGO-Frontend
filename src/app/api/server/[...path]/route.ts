import { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import instance from '@/shared/api/instance';

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

async function handleRequest(req: NextRequest, isRetry = false) {
  const cookieStore = cookies();
  let accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${req.nextUrl.pathname.replace('/api/server', '')}`;

  const method = req.method;
  const params = Object.fromEntries(req.nextUrl.searchParams.entries());

  let data;
  if (!['GET', 'DELETE', 'HEAD'].includes(method)) {
    try {
      const textBody = await req.text();
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
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    const status = axiosError.response?.status || 500;

    if (status === 401 && !isRetry && refreshToken) {
      const newTokens = await refreshAccessToken(refreshToken);
      if (newTokens) {
        accessToken = newTokens.accessToken;
        return handleRequest(req, true);
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

async function refreshAccessToken(refreshToken: string) {
  try {
    const response = await instance.post('/user/auth/refresh', null, {
      headers: { 'Refresh-Token': refreshToken },
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    cookies().set('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: Number.MAX_SAFE_INTEGER,
    });

    cookies().set('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: Number.MAX_SAFE_INTEGER,
    });

    return { accessToken, refreshToken: newRefreshToken };
  } catch (error) {
    return null;
  }
}
