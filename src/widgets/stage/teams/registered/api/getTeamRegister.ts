import clientInstance from '@/shared/libs/http/clientInstance';
import { TeamRegisterResponse } from '@/shared/types/stage/teams/registered';

export const getTeamRegister = async (
  gameId: string,
): Promise<TeamRegisterResponse> => {
  try {
    const { data } = await clientInstance.get<TeamRegisterResponse>(
      `/stage/team/temp/${gameId}`,
    );
    return data;
  } catch (error) {
    throw new Error('Failed to fetch community list');
  }
};
