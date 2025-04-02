import { useQuery } from '@tanstack/react-query';
import { TeamRegisterResponse } from '@/shared/types/stage/teams/registered';
import { getTeamRegister } from '../api/getTeamRegister';

export const useGetTeamRegisterQuery = (gameId: string) => {
  return useQuery<TeamRegisterResponse, Error>({
    queryKey: ['communityList', gameId],
    queryFn: () => getTeamRegister(gameId),
  });
};
