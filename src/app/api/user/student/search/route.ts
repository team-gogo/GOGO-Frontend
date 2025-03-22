import { AxiosError, AxiosResponse } from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { get } from '@/shared/api/http';

interface Student {
  studentId: number;
  grade: number;
  studentNumber: number;
  classNumber: number;
  name: string;
}

interface StudentSearchResponse {
  students: Student[];
}

export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  try {
    const response: AxiosResponse<StudentSearchResponse> = await get(
      '/user/student/search',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          name: name,
        },
      },
    );

    return NextResponse.json(response.data);
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    const status = axiosError.response?.status || 500;
    const message =
      axiosError.response?.data?.message || '학생 검색을 실패 했습니다.';

    return NextResponse.json({ error: message, status }, { status });
  }
}
