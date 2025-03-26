import { useQuery } from '@tanstack/react-query';
import { CommunityDetail } from '@/shared/types/community/detail';
import { getCommunityDetail } from '../api/getCommunityDetail';

export const useGetCommunityDetailQuery = (boardId: string) => {
  return useQuery<CommunityDetail, Error>({
    queryKey: ['communityDetail', boardId],
    queryFn: () => getCommunityDetail(boardId),
  });
};
