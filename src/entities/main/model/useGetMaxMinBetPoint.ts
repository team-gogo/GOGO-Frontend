import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  getMaxMinBetPoint,
  GetMaxMinBetPointResponse,
} from '../api/getMaxMinBetPoint';

export const useGetMaxMinBetPoint = (
  stageId: number,
  options?: Omit<
    UseQueryOptions<GetMaxMinBetPointResponse>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery<GetMaxMinBetPointResponse>({
    queryKey: [stageId, 'max', 'min'],
    queryFn: ({ queryKey }) => {
      const [stageId] = queryKey as [number, string, string];
      return getMaxMinBetPoint(stageId);
    },
    ...options,
  });
};
