import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postBoardComment } from '../api/postBoardComment';

export const usePostBoardCommentMutation = (
  boardId: string,
  stageId: string,
  currentPage: number,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { content: string }) =>
      postBoardComment(boardId, data.content),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['communityDetail', boardId],
      });
      queryClient.invalidateQueries({
        queryKey: ['communityList', stageId, currentPage],
        exact: false,
      });
      return data;
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
