import { useQuery } from '@tanstack/react-query';
import { ActiveGameList } from '@/shared/types/mini-game';
import { getActiveGame } from '../api/getActiveGame';

export const useGetActiveGameQuery = (stageId: string) => {
  return useQuery<ActiveGameList, Error>({
    queryKey: ['getActiveGame', stageId],
    queryFn: () => getActiveGame(stageId),
  });
};
