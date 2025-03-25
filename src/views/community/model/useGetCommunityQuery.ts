import { useQuery } from '@tanstack/react-query';
import { SportType } from '@/shared/model/sportTypes';
import { SortType } from '@/shared/model/sportTypes';
import { BoardData } from '@/shared/types/community';
import { getCommunityList } from '../api/getCommunityList';

export const useGetCommunityQuery = (
  stageId: string,
  selectedSport: SportType | null,
  selectedSort: SortType | null,
  currentPage: number,
) => {
  return useQuery<BoardData, Error>({
    queryKey: ['communityList', stageId],
    queryFn: () =>
      getCommunityList(stageId, selectedSport, selectedSort, currentPage),
  });
};
