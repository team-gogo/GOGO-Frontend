import { useQuery } from '@tanstack/react-query';
import { ResponseStageGame } from '@/shared/types/community';
import { getStageGame } from '../api/getStageGame';

export const useGetStageGameQuery = (stageId: string) => {
  return useQuery<ResponseStageGame, Error>({
    queryKey: ['stageGame', stageId],
    queryFn: () => getStageGame(stageId),
  });
};
