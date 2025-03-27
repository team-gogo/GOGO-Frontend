import axios from 'axios';
import { StageResponse } from '@/shared/types/stage';

export const getStageList = async (): Promise<StageResponse> => {
  try {
    const response = await axios.get<StageResponse>('/api/server/stage');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
        window.location.href = '/signin';
      }
      throw new Error(
        error.response.data.error || '스테이지 불러오기를 실패 했습니다.',
      );
    }
    throw error;
  }
};
