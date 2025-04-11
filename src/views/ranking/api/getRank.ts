import axios from 'axios';
import clientInstance from '@/shared/api/clientInstance';
import { RankingData } from '@/shared/types/ranking';

export const getRank = async (
  stageId: string,
  page: number,
  size: number,
): Promise<RankingData> => {
  try {
    const response = await clientInstance.get(`/stage/rank/${stageId}`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
};
