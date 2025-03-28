import axios from 'axios';
import { ActiveGameList } from '@/shared/types/mini-game';

export const getActiveGame = async (
  stageId: string,
): Promise<ActiveGameList> => {
  try {
    const response = await axios.get(
      `/api/server/minigame/active-game/${stageId}`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
};
