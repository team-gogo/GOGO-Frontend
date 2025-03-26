import { useMemo } from 'react';
import { useGetStageGameQuery } from '@/entities/community/model/useGetStageGameQuery';
import { SportType } from '@/shared/model/sportTypes';

export const useCategoryTypes = (
  stageId: string,
): { categoryTypes: SportType[]; isLoading: boolean } => {
  const { data, isLoading } = useGetStageGameQuery(stageId);

  const categoryTypes: SportType[] = useMemo(() => {
    if (!data?.games) return [];
    return Array.from(
      new Set(data.games.map((game) => game.category)),
    ) as SportType[];
  }, [data]);

  return { categoryTypes, isLoading };
};
