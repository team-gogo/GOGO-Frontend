import axios from 'axios';
import { StageData } from '@/shared/types/stage/create';

export const postOfficialStage = async (data: StageData) => {
  try {
    await axios.post('/api/user/auth/signup', data);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || '회원가입에 실패했습니다.');
    }
    throw error;
  }
};
