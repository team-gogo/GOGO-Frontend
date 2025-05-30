import axios from 'axios';
import clientInstance from '@/shared/libs/http/clientInstance';

export const postCancleBatch = async (matchId: number) => {
  try {
    await clientInstance.post(`/betting/batch/cancel/${matchId}`);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || '정산 롤백에 실패 했습니다.',
      );
    }
    throw error;
  }
};
