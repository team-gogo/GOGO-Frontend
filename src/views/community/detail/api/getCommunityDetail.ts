import axios from 'axios';
import { CommunityDetail } from '@/shared/types/community/detail';

export const getCommunityDetail = async (
  boardId: string,
): Promise<CommunityDetail> => {
  try {
    const { data } = await axios.get<CommunityDetail>(
      `/api/server/stage/community/board/${boardId}`,
    );
    return data;
  } catch (error) {
    throw new Error('Failed to fetch community detail');
  }
};
