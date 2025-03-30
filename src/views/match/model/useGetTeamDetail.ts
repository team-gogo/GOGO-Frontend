import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { TeamDetailType } from '@/shared/types/match';
import minutesToMs from '@/shared/utils/minutesToms';
import { getTeamDetail } from '../api/getTeamDetail';

export const useGetTeamDetail = (
  teamId: number,
  options?: Omit<UseQueryOptions<TeamDetailType>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<TeamDetailType, Error>({
    queryKey: ['team', 'detail', teamId],
    queryFn: () => getTeamDetail(teamId),
    staleTime: minutesToMs(5),
    gcTime: minutesToMs(5),
    ...options,
  });
};
