import { useQuery } from '@tanstack/react-query';
import { SortType, SportType } from '@/shared/model/sportTypes';
import { BoardData } from '@/shared/types/community';
import { getCommunityList } from '../api/getCommunityList';

export const useGetCommunityQuery = (
  stageId: string,
  currentPage: number,
  selectedSport?: SportType | null | undefined,
  selectedSort?: SortType | null | undefined,
) => {
  return useQuery<BoardData, Error>({
    queryKey: [
      'communityList',
      stageId,
      currentPage,
      selectedSport,
      selectedSort,
    ],
    queryFn: () =>
      getCommunityList(stageId, currentPage, selectedSport, selectedSort),
  });
};
