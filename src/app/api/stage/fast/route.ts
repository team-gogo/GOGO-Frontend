import { AxiosError, AxiosResponse } from 'axios';

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { post } from '@/shared/api/http';

export async function POST(request: Request) {
  const body = await request.json();
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  try {
    const response = await post<AxiosResponse>('/stage/fast', body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;

    const status = axiosError.response?.status || 500;
    const message =
      axiosError.response?.data?.message || '빠른 경기 생성을 실패 했습니다.';

    return NextResponse.json({ error: message, status }, { status });
  }
}
