import axios from 'axios';
import clientInstance from '@/shared/api/clientInstance';
import { CoinTossForm } from '@/shared/types/mini-game/conin-toss';

export const postCoinToss = async (stageId: string, data: CoinTossForm) => {
  try {
    const response = await clientInstance.post(
      `/minigame/coin-toss/${stageId}`,
      data,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || '코인토스 배팅을 실패 했습니다.',
      );
    }
    throw error;
  }
};
