import axios from 'axios';
import clientInstance from '@/shared/api/clientInstance';
import { MyStageResponse } from '@/shared/types/my';

export const getMyStageInfo = async (): Promise<MyStageResponse> => {
  try {
    const response = await clientInstance.get<MyStageResponse>('/stage/me');
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
