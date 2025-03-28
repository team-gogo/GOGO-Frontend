import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import { cookies } from 'next/headers';

interface TokenRefreshResponse {
  accessToken: string;
  refreshToken: string;
}

const serverInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

let refreshTokenPromise: Promise<string> | null = null;

serverInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (refreshTokenPromise) {
        try {
          const newAccessToken = await refreshTokenPromise;
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return await serverInstance(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      originalRequest._retry = true;

      refreshTokenPromise = (async () => {
        try {
          const cookieStore = cookies();
          const refreshToken = cookieStore.get('refreshToken')?.value;

          if (!refreshToken) throw new Error('No refresh token');

          const response = await axios.post<TokenRefreshResponse>(
            `${process.env.NEXT_PUBLIC_BASE_URL}/user/auth/refresh`,
            null,
            {
              headers: { 'Refresh-Token': refreshToken },
              withCredentials: false,
            },
          );

          const { accessToken, refreshToken: newRefreshToken } = response.data;

          cookieStore.set('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: Number.MAX_SAFE_INTEGER,
          });

          cookieStore.set('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: Number.MAX_SAFE_INTEGER,
          });

          return accessToken;
        } catch (error) {
          console.log('토큰 재발급 실패');
          throw error;
        } finally {
          refreshTokenPromise = null;
        }
      })();

      try {
        const newAccessToken = await refreshTokenPromise;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return await serverInstance(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default serverInstance;
