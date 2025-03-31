import clientInstance from '@/shared/api/clientInstance';

interface Team {
  teamId: number;
  teamName: string;
  participantCount: number;
}

interface GetTempTeamResponse {
  count: number;
  team: Team[];
}

export const getTempTeam = async (
  gameId: string,
): Promise<GetTempTeamResponse> => {
  try {
    const response = await clientInstance.get<GetTempTeamResponse>(
      `/stage/team/temp/${gameId}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
