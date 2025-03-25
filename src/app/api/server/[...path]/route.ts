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

async function handleRequest(req: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${req.nextUrl.pathname.replace('/api/server', '')}`;

  console.log('🍒' + url + ' ' + req.method);
  const method = req.method;

  const params = Object.fromEntries(req.nextUrl.searchParams.entries());

  let data;
  if (!['GET', 'DELETE', 'HEAD'].includes(method)) {
    try {
      const textBody = await req.text();
      data = textBody ? JSON.parse(textBody) : undefined;
    } catch (error) {
      console.error('JSON 파싱 오류:', error);
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
    console.log('에러발래ㅐㅐㅐㅐ' + error);
    const axiosError = error as AxiosError<{ message: string }>;
    const status = axiosError.response?.status || 500;
    const message =
      axiosError.response?.data?.message ||
      '요청을 처리하는 중 오류가 발생했습니다.';

    return NextResponse.json({ error: message, status }, { status });
  }
}
