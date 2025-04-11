import { useQuery } from '@tanstack/react-query';
import { ResponseBetLimit } from '@/shared/types/mini-game';
import { getBetLimit } from '../api/getBetLimit';

export const useGetBetLimit = (stageId: string) => {
  return useQuery<ResponseBetLimit, Error>({
    queryKey: ['getBetLimit', stageId],
    queryFn: () => getBetLimit(stageId),
  });
};
