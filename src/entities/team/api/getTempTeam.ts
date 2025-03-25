import { get } from '@/shared/api/http';

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
  return get<GetTempTeamResponse>(`/api/server/stage/team/temp/${gameId}`);
};
