import { AxiosResponse } from 'axios';
import { NextResponse } from 'next/server';

export function createResponse(response: AxiosResponse) {
  return response.status === 204
    ? new NextResponse(null, { status: 204 })
    : NextResponse.json(response.data, { status: response.status });
}

export function createErrorResponse(
  message: string,
  status: number,
  isRefreshError = false,
) {
  return NextResponse.json(
    {
      error: message,
      status: status,
      isRefreshError: isRefreshError,
    },
    { status },
  );
}
