import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postCommentLike } from '../api/postCommentLike';

export const usePostCommentLike = (commentId: number, boardId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => postCommentLike(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['communityDetail', boardId],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
