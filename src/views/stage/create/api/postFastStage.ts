import axios from 'axios';
import { StageData } from '@/shared/types/stage/create';

export const postFastStage = async (data: StageData) => {
  try {
    await axios.post('/api/stage/fast', data);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || '빠른 경기 생성을 실패 했습니다.',
      );
    }
    throw error;
  }
};
