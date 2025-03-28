import { useQuery } from '@tanstack/react-query';
import { getMyPointResponse } from '@/shared/types/mini-game';
import minutesToMs from '@/shared/utils/minutesToms';
import { getMyPoint } from '../api/getMyPoint';

export const useGetMyPointQuery = (stageId: string) => {
  return useQuery<getMyPointResponse, Error>({
    queryKey: ['getMyPoint', stageId],
    queryFn: () => getMyPoint(stageId),
    staleTime: minutesToMs(5),
    gcTime: minutesToMs(5),
  });
};
