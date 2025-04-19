import clientInstance from '@/shared/libs/http/clientInstance';
import { SortType } from '@/shared/model/sportTypes';
import { SportType } from '@/shared/model/sportTypes';
import { BoardData } from '@/shared/types/community';

export const getCommunityList = async (
  stageId: string,
  currentPage: number,
  selectedSport?: SportType | null,
  selectedSort?: SortType | null,
): Promise<BoardData> => {
  try {
    const { data } = await clientInstance.get<BoardData>(
      `/stage/community/${stageId}`,
      {
        params: {
          page: currentPage - 1,
          size: 7,
          category: selectedSport ?? undefined,
          sort: selectedSort ?? undefined,
        },
      },
    );
    return data;
  } catch (error) {
    throw new Error('Failed to fetch community list');
  }
};
