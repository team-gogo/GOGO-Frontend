import axios from 'axios';
import { ResponseStageGame } from '@/shared/types/community';

export const getStageGame = async (
  stageId: string,
): Promise<ResponseStageGame> => {
  try {
    const { data } = await axios.get<ResponseStageGame>(
      `/api/server/stage/game/${stageId}`,
    );
    return data;
  } catch (error) {
    throw new Error('Failed to fetch stage game detail');
  }
};
