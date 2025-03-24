import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { StageResponse } from '@/shared/types/stage';
import minutesToMs from '@/shared/utils/minutesToms';
import { getStageList } from '../api/getStageList';

export const useGetStageList = (
  options?: Omit<UseQueryOptions<StageResponse>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<StageResponse>({
    queryKey: ['stage', 'get', 'list'],
    queryFn: getStageList,
    staleTime: minutesToMs(5),
    gcTime: minutesToMs(5),
    ...options,
  });
};
