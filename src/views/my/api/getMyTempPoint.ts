import axios from 'axios';
import { TempPointsResponse } from '@/shared/types/my/bet';

export const getMyTempPoint = async (
  stageId: number,
): Promise<TempPointsResponse> => {
  try {
    const response = await axios.get<TempPointsResponse>(
      `/api/server/stage/temp-point/me/${stageId}`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || '내 임시 포인트 불러오기를 실패 했습니다.',
      );
    }
    throw error;
  }
};
