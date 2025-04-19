import { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export type RequestData =
  | FormData
  | Record<string, unknown>
  | string
  | undefined;

export interface RefreshTokenResult {
  accessToken: string;
  refreshToken: string;
}

export interface CachedTokens extends RefreshTokenResult {
  expiresAt: number;
}

export interface GlobalRefreshState {
  refreshTokenPromise: Promise<RefreshTokenResult | null> | null;
  isRefreshing: boolean;
  lastRefreshTime: number;
  cachedTokens?: CachedTokens;
  waitingRequests: WaitingRequest[];
}

export interface WaitingRequest {
  resolve: (response: NextResponse) => void;
  reject: (error: AxiosError) => void;
  req: NextRequest;
  isRetry: boolean;
  originalBody?: string | FormData;
}
