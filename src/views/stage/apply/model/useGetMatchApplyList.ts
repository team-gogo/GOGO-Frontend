import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { MatchGamesResponse } from '@/shared/types/stage/apply';
import minutesToMs from '@/shared/utils/minutesToms';
import { getMatchApplyList } from '../api/getMatchApplyList';

export const useGetMatchApplyList = (
  stageId: number,
  options?: Omit<UseQueryOptions<MatchGamesResponse>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<MatchGamesResponse>({
    queryKey: ['match', 'apply', stageId],
    queryFn: ({ queryKey }) => getMatchApplyList(queryKey[2] as number),
    staleTime: minutesToMs(5),
    gcTime: minutesToMs(5),
    ...options,
  });
};
