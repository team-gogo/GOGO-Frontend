import axios from 'axios';
import { MyPointType } from '@/shared/types/main';

export const getUserStagePoint = async (
  stageId: number,
): Promise<MyPointType> => {
  try {
    const response = await axios.get<MyPointType>(
      `/api/server/stage/point/me/${stageId}`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || '내 포인트 불러오기를 실패 했습니다.',
      );
    }
    throw error;
  }
};
