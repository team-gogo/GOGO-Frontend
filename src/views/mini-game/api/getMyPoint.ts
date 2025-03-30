import axios from 'axios';
import clientInstance from '@/shared/api/clientInstance';
import { getMyPointResponse } from '@/shared/types/mini-game';

export const getMyPoint = async (
  stageId: string,
): Promise<getMyPointResponse> => {
  try {
    const response = await clientInstance.get(`/stage/point/me/${stageId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
};
