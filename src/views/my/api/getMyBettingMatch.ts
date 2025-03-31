import axios from 'axios';
import clientInstance from '@/shared/api/clientInstance';
import { MatchResponse } from '@/shared/types/my/bet';

export const getMyBettingMatch = async (
  stageId: number,
): Promise<MatchResponse> => {
  try {
    const response = await clientInstance.get<MatchResponse>(
      `/stage/match/me/${stageId}`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || '내 베팅 정보 불러오기를 실패 했습니다.',
      );
    }
    throw error;
  }
};
