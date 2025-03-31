import axios from 'axios';
import clientInstance from '@/shared/api/clientInstance';
import { PlinkoFormType, PlinkoResponse } from '@/shared/types/mini-game';

export const postPlinkoGame = async (
  stageId: number,
  data: PlinkoFormType,
): Promise<PlinkoResponse> => {
  try {
    const response = await clientInstance.post(
      `/minigame/plinko/${stageId}`,
      data,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || '플린코 게임 요청에 실패 했습니다.',
      );
    }
    throw error;
  }
};
