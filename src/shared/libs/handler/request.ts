import { AxiosRequestConfig, ResponseType } from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import serverInstance from '../http/serverInstance';
import { tokenHandleRequest } from './tokenHandler';
import { RequestData } from './type';

export async function parseRequestData(
  req: NextRequest,
  originalBody?: string | FormData,
): Promise<{
  requestData: RequestData;
  headers: Record<string, string | undefined>;
}> {
  const contentType = req.headers.get('content-type') || '';
  const headers: Record<string, string | undefined> = {};
  let requestData: RequestData = undefined;

  if (!['GET', 'DELETE', 'HEAD'].includes(req.method)) {
    if (contentType.includes('multipart/form-data')) {
      requestData = await req.formData();
    } else if (contentType.includes('application/json')) {
      const bodyText =
        typeof originalBody === 'string' ? originalBody : await req.text();
      requestData = JSON.parse(bodyText);
      headers['Content-Type'] = 'application/json';
    } else {
      const bodyText =
        typeof originalBody === 'string' ? originalBody : await req.text();
      requestData = bodyText;
    }
  }

  return { requestData, headers };
}

export async function sendRequest(
  req: NextRequest,
  accessToken: string | undefined,
  requestData: RequestData,
  headers: Record<string, string | undefined>,
) {
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const responseType: ResponseType = 'json';

  const axiosConfig: AxiosRequestConfig = {
    responseType,
    headers: headers as AxiosRequestConfig['headers'],
  };

  return await serverInstance.request({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}${req.nextUrl.pathname.replace(
      '/api/server',
      '',
    )}`,
    method: req.method as AxiosRequestConfig['method'],
    params: Object.fromEntries(req.nextUrl.searchParams.entries()),
    data: requestData,
    ...axiosConfig,
  });
}

export async function retryRequest(
  req: NextRequest,
  accessToken: string,
  body?: string | FormData,
): Promise<NextResponse> {
  const headers = new Headers(req.headers);
  headers.set('Authorization', `Bearer ${accessToken}`);

  const newReq = new NextRequest(req.url, {
    method: req.method,
    headers,
    body: body && typeof body === 'string' ? body : undefined,
  });

  return tokenHandleRequest(newReq, true, body);
}
