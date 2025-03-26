import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { MyPointType } from '@/shared/types/main';
import minutesToMs from '@/shared/utils/minutesToms';
import { getUserStagePoint } from '../api/getUserStagePoint';

export const useGetUserStagePoint = (
  stageId: number,
  options?: Omit<UseQueryOptions<MyPointType>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<MyPointType>({
    queryKey: [stageId, 'point', 'my'],
    queryFn: ({ queryKey }) => {
      const [stageId] = queryKey as [number, string, string];
      return getUserStagePoint(stageId);
    },
    staleTime: minutesToMs(5),
    gcTime: minutesToMs(5),
    ...options,
  });
};
