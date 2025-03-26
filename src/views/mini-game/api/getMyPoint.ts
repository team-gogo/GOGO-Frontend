import axios from 'axios';
import { getMyPointResponse } from '@/shared/types/mini-game';

export const getMyPoint = async (
  stageId: string,
): Promise<getMyPointResponse> => {
  try {
    const response = await axios.get(`/api/server/stage/point/me/${stageId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
};
