export interface LoginResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    authority: string;
  };
  status: number;
}
