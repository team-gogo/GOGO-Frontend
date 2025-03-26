import { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import instance from '@/shared/api/instance';

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const response = await instance.post('/user/auth/signup', body);

    const { accessToken, refreshToken } = response.data;

    console.log(response.data);

    cookies().set('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: Number.MAX_SAFE_INTEGER,
    });

    cookies().set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: Number.MAX_SAFE_INTEGER,
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
