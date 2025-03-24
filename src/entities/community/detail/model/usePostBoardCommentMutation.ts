import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postBoardComment } from '../api/postBoardComment';

export const usePostBoardCommentMutation = (boardId: number) => {
  return useMutation({
    mutationFn: (data: { content: string }) =>
      postBoardComment(boardId, data.content),
    onSuccess: (data) => {
      return data;
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
