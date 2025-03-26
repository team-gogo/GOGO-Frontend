import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postCommentLike } from '../api/postCommentLike';

export const usePostCommentLike = (commentId: number) => {
  return useMutation({
    mutationFn: () => postCommentLike(commentId),

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
