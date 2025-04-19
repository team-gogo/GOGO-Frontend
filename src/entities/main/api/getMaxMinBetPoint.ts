import axios from 'axios';
import clientInstance from '@/shared/libs/http/clientInstance';

export interface GetMaxMinBetPointResponse {
  maxBettingPoint: number;
  minBettingPoint: number;
}

export const getMaxMinBetPoint = async (
  stageId: number,
): Promise<GetMaxMinBetPointResponse> => {
  try {
    const response = await clientInstance.get<GetMaxMinBetPointResponse>(
      `/stage/rule/${stageId}`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || '게시물 댓글 작성을 실패 했습니다.',
      );
    }
    throw error;
  }
};
