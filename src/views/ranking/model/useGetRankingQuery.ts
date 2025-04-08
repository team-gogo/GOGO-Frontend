import { useQuery } from '@tanstack/react-query';
import { RankingData } from '@/shared/types/ranking';
import { getRank } from '../api/getRank';

export const useGetRankingQuery = (
  stageId: string,
  page: number,
  size: number,
) => {
  return useQuery<RankingData, Error>({
    queryKey: ['ranking', stageId, page, size],
    queryFn: () => getRank(stageId, page, size),
  });
};
