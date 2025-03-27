import axios from 'axios';
import { RankingData } from '@/shared/types/ranking';

export const getRank = async (stageId: string): Promise<RankingData> => {
  try {
    const response = await axios.get(`/api/server/stage/rank/${stageId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
};
