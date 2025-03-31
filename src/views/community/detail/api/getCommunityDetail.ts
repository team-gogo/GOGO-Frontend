import clientInstance from '@/shared/api/clientInstance';
import { CommunityDetail } from '@/shared/types/community/detail';

export const getCommunityDetail = async (
  boardId: string,
): Promise<CommunityDetail> => {
  try {
    const { data } = await clientInstance.get<CommunityDetail>(
      `/stage/community/board/${boardId}`,
    );
    return data;
  } catch (error) {
    throw new Error('Failed to fetch community detail');
  }
};
