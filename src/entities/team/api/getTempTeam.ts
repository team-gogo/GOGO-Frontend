import axios from 'axios';

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
    const response = await axios.get<GetTempTeamResponse>(
      `/api/server/stage/team/temp/${gameId}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
