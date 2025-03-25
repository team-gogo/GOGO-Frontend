import { useQuery } from '@tanstack/react-query';
import { RankingData } from '@/shared/types/ranking';
import { getRank } from '../api/getRank';

export const useGetRankingQuery = (stageId: string) => {
  return useQuery<RankingData, Error>({
    queryKey: ['ranking', stageId],
    queryFn: () => getRank(stageId),
  });
};
