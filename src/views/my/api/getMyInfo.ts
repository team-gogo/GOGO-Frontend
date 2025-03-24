import axios from 'axios';
import { userInfoResponse } from '@/shared/types/my';

export const getMyInfo = async (): Promise<userInfoResponse> => {
  try {
    const response = await axios.get<userInfoResponse>(
      '/api/server/user/student/me',
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || '내 정보 불러오기를 실패 했습니다.',
      );
    }
    throw error;
  }
};
