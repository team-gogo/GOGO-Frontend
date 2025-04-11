import axios from 'axios';
import clientInstance from '@/shared/api/clientInstance';

export interface GetIsWastedResponse {
  isWasted: boolean;
}

export const getIsWasted = async (
  stageId: number,
): Promise<GetIsWastedResponse> => {
  try {
    const response = await clientInstance.get<GetIsWastedResponse>(
      `/stage/wasted/me/${stageId}`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || '파산 조회를 실패했습니다');
    }
    throw error;
  }
};
