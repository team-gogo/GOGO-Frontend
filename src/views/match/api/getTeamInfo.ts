import axios from 'axios';
import clientInstance from '@/shared/api/clientInstance';
import { TeamListResponse } from '@/shared/types/match';

export const getTeamInfo = async (
  gameId: number,
): Promise<TeamListResponse> => {
  try {
    const response = await clientInstance.get(`/stage/team/${gameId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
};
