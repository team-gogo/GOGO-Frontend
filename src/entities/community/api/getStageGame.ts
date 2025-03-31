import clientInstance from '@/shared/api/clientInstance';
import { ResponseStageGame } from '@/shared/types/community';

export const getStageGame = async (
  stageId: string,
): Promise<ResponseStageGame> => {
  try {
    const { data } = await clientInstance.get<ResponseStageGame>(
      `/stage/game/${stageId}`,
    );
    return data;
  } catch (error) {
    throw new Error('Failed to fetch stage game detail');
  }
};
