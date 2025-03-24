import axios from 'axios';
import { SortType } from '@/shared/model/sportTypes';
import { SportType } from '@/shared/model/sportTypes';
import { BoardData } from '@/shared/types/community';

export const getCommunityList = async (
  stageId: string,
  selectedSport: SportType | null,
  selectedSort: SortType | null,
  currentPage: number,
): Promise<BoardData> => {
  try {
    const { data } = await axios.get<BoardData>(
      `/api/server/stage/community/${stageId}`,
      {
        params: {
          page: currentPage - 1,
          size: 5,
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
