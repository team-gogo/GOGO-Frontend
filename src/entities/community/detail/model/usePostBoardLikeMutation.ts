import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postBoardLike } from '../api/postBoardLike';

export const usePostBoardLikeMutation = (
  boardId: string,
  stageId: string,
  currentPage: number,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => postBoardLike(boardId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['communityDetail', boardId],
      });
      queryClient.invalidateQueries({
        queryKey: ['communityList', stageId, currentPage],
        exact: false,
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
