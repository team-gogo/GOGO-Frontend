import axios from 'axios';
import { BettingFormData } from '@/shared/types/main';

export const postBettingMatch = async (
  matchId: number,
  data: BettingFormData,
) => {
  try {
    await axios.post(`/api/server/betting/${matchId}`, data);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || '베팅에 실패 했습니다.');
    }
    throw error;
  }
};
