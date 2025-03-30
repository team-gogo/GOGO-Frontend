import axios from 'axios';
import { TeamDetailType } from '@/shared/types/match';

export const getTeamDetail = async (
  teamId: number,
): Promise<TeamDetailType> => {
  try {
    const response = await axios.get(`/api/server/stage/team/info/${teamId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
};
