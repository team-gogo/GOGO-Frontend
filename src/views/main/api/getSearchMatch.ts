import axios from 'axios';
import clientInstance from '@/shared/libs/http/clientInstance';
import { MatchResponse } from '@/shared/types/my/bet';

export const getSearchMatch = async (
  stageId: number,
  y: number,
  m: number,
  d: number,
): Promise<MatchResponse> => {
  try {
    const response = await clientInstance.get<MatchResponse>(
      `/stage/match/search/${stageId}`,
      {
        params: { y, m, d },
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error ||
          '해당 날짜의 매치 불러오기를 실패 했습니다.',
      );
    }
    throw error;
  }
};
