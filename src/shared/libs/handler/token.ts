import { AxiosError } from 'axios';
import { LRUCache } from 'lru-cache';
import { NextRequest, NextResponse } from 'next/server';
import { refreshAccessToken } from './refreshAccessToken';
import { retryRequest } from './request';

export interface GlobalRefreshState {
  isRefreshing: boolean;
  refreshTokenPromise: Promise<RefreshTokenResult | null> | null;
  lastRefreshTime: number;
  waitingRequests: {
    resolve: (res: NextResponse) => void;
    reject: (err: AxiosError) => void;
    req: NextRequest;
    originalBody?: string | FormData;
  }[];
}

export interface RefreshTokenResult {
  accessToken: string;
  refreshToken: string;
}

export const globalForRefresh = new LRUCache<string, GlobalRefreshState>({
  max: 30000,
  ttl: 1000 * 5,
  allowStale: true,
});

export function getRefreshStateForUser(
  refreshToken: string,
): GlobalRefreshState {
  if (!globalForRefresh.has(refreshToken)) {
    const newState: GlobalRefreshState = {
      isRefreshing: false,
      refreshTokenPromise: null,
      lastRefreshTime: 0,
      waitingRequests: [],
    };
    globalForRefresh.set(refreshToken, newState);
    return newState;
  }
  return globalForRefresh.get(refreshToken)!;
}

export async function performTokenRefresh(
  refreshToken: string,
  refreshState: GlobalRefreshState,
): Promise<RefreshTokenResult | null> {
  const now = Date.now();

  if (refreshState.isRefreshing && refreshState.refreshTokenPromise) {
    return await refreshState.refreshTokenPromise;
  }

  try {
    refreshState.isRefreshing = true;
    refreshState.lastRefreshTime = now;
    refreshState.refreshTokenPromise = refreshAccessToken(refreshToken);

    const result = await refreshState.refreshTokenPromise;

    if (result) {
      await processWaitingRequests(refreshState, result.accessToken);
    }

    return result;
  } catch (error) {
    rejectWaitingRequests(refreshState, error as AxiosError);
    globalForRefresh.delete(refreshToken);
    return null;
  } finally {
    refreshState.isRefreshing = false;
    refreshState.refreshTokenPromise = null;
  }
}

async function processWaitingRequests(
  refreshState: GlobalRefreshState,
  accessToken: string,
) {
  const waiting = [...refreshState.waitingRequests];
  refreshState.waitingRequests = [];

  for (const { resolve, reject, req, originalBody } of waiting) {
    try {
      const response = await retryRequest(req, accessToken, originalBody);
      resolve(response);
    } catch (err) {
      reject(err as AxiosError);
    }
  }
}

function rejectWaitingRequests(
  refreshState: GlobalRefreshState,
  error: AxiosError,
) {
  const waiting = [...refreshState.waitingRequests];
  refreshState.waitingRequests = [];

  for (const { reject } of waiting) {
    reject(error);
  }
}
