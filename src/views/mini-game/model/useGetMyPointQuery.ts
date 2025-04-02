import { useQuery } from '@tanstack/react-query';
import { getMyPointResponse } from '@/shared/types/mini-game';
import { getMyPoint } from '../api/getMyPoint';

export const useGetMyPointQuery = (stageId: string) => {
  return useQuery<getMyPointResponse, Error>({
    queryKey: ['getMyPoint', stageId],
    queryFn: () => getMyPoint(stageId),
  });
};
