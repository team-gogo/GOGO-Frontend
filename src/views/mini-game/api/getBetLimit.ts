import axios from 'axios';
import clientInstance from '@/shared/api/clientInstance';
import { ResponseBetLimit } from '@/shared/types/mini-game';

export const getBetLimit = async (
  stageId: string,
): Promise<ResponseBetLimit> => {
  try {
    const response = await clientInstance.get(`/minigame/bet-limit/${stageId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || '최소 최대 배팅 포인트 불러오기 실패',
      );
    }
    throw error;
  }
};
