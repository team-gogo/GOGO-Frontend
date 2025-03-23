import { AxiosError, AxiosResponse } from 'axios';

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { post } from '@/shared/api/http';

export async function POST(request: Request) {
  const body = await request.json();
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  try {
    const response = await post<AxiosResponse>('/user/auth/signup', body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;

    const status = axiosError.response?.status || 500;
    const message =
      axiosError.response?.data?.message || '회원가입에 실패했습니다.';

    return NextResponse.json({ error: message, status }, { status });
  }
}
