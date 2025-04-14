import axios from 'axios';
import clientInstance from '@/shared/api/clientInstance';
import {
  betAmountFormData,
  YavarweeBetResponse,
} from '@/shared/types/mini-game/yavarwee';

export const postBetyavarwee = async (
  StageId: string,
  data: betAmountFormData,
): Promise<YavarweeBetResponse> => {
  try {
    const response = await clientInstance.post(
      `/minigame/yavarwee/bet/${StageId}`,
      data,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || '야바위 배팅을 실패했습니다',
      );
    }
    throw error;
  }
};
