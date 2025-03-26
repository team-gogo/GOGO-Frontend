import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { TempPointsResponse } from '@/shared/types/my/bet';
import minutesToMs from '@/shared/utils/minutesToms';
import { getMyTempPoint } from '../api/getMyTempPoint';

export const useGetMyTempPoint = (
  stageId: number,
  options?: Omit<UseQueryOptions<TempPointsResponse>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<TempPointsResponse>({
    queryKey: ['temp', 'point', stageId],
    queryFn: ({ queryKey }) => getMyTempPoint(queryKey[2] as number),
    staleTime: minutesToMs(5),
    gcTime: minutesToMs(5),
    ...options,
  });
};
