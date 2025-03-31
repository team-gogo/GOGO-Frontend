import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { TeamListResponse } from '@/shared/types/match';
import minutesToMs from '@/shared/utils/minutesToms';
import { getTeamInfo } from '../api/getTeamInfo';

export const useGetTeamInfo = (
  gameId: number,
  options?: Omit<UseQueryOptions<TeamListResponse>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<TeamListResponse, Error>({
    queryKey: ['team', 'info', gameId],
    queryFn: () => getTeamInfo(gameId),
    staleTime: minutesToMs(5),
    gcTime: minutesToMs(5),
    ...options,
  });
};
