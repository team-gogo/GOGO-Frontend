import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { MatchResponse } from '@/shared/types/my/bet';
import minutesToMs from '@/shared/utils/minutesToms';
import { getMyBettingMatch } from '../api/getMyBettingMatch';

export const useGetMyBettingMatch = (
  stageId: number,
  options?: Omit<UseQueryOptions<MatchResponse>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<MatchResponse>({
    queryKey: ['betting', 'match', stageId],
    queryFn: ({ queryKey }) => getMyBettingMatch(queryKey[2] as number),
    staleTime: minutesToMs(5),
    gcTime: minutesToMs(5),
    ...options,
  });
};
