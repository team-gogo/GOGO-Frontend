import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { MatchResponse } from '@/shared/types/my/bet';
import minutesToMs from '@/shared/utils/minutesToms';
import { getSearchMatch } from '../api/getSearchMatch';

export const useGetSearchMatch = (
  stageId: number,
  y: number,
  m: number,
  d: number,
  options?: Omit<UseQueryOptions<MatchResponse>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<MatchResponse>({
    queryKey: ['searchMatch', stageId, y, m, d],
    queryFn: ({ queryKey }) => {
      const [, stageId, y, m, d] = queryKey as [
        string,
        number,
        number,
        number,
        number,
      ];
      return getSearchMatch(stageId, y, m, d);
    },
    staleTime: minutesToMs(5),
    gcTime: minutesToMs(5),
    ...options,
  });
};
