import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { MyStageResponse } from '@/shared/types/my';
import minutesToMs from '@/shared/utils/minutesToms';
import { getMyStageInfo } from '../api/getMyStageInfo';

export const useGetMyStageInfo = (
  options?: Omit<UseQueryOptions<MyStageResponse>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<MyStageResponse>({
    queryKey: ['my', 'info', 'stage'],
    queryFn: getMyStageInfo,
    staleTime: minutesToMs(5),
    gcTime: minutesToMs(5),
    ...options,
  });
};
