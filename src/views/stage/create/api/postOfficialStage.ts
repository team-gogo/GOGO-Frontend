import axios from 'axios';
import clientInstance from '@/shared/libs/http/clientInstance';
import { StageData } from '@/shared/types/stage/create';

export const postOfficialStage = async (data: StageData) => {
  try {
    await clientInstance.post('/stage/official', data);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || '공식 경기 생성을 실패 했습니다.',
      );
    }
    throw error;
  }
};
