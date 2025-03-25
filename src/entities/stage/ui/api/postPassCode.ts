import axios from 'axios';
import { PassCodeType } from '@/shared/types/stage';

export const postPassCode = async (stageId: number, data: PassCodeType) => {
  try {
    await axios.post(`/api/server/stage/join/${stageId}`, data);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || '패스 코드 전송을 실패 했습니다.',
      );
    }
    throw error;
  }
};
