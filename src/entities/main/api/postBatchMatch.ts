import axios from 'axios';
import { BatchMatchType } from '@/shared/types/main';

export const postBatchMatch = async (matchId: number, data: BatchMatchType) => {
  try {
    await axios.post(`/api/server/betting/batch/${matchId}`, data);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || '정산에 실패 했습니다.');
    }
    throw error;
  }
};
