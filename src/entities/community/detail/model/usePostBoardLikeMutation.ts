import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postBoardLike } from '../api/postBoardLike';

export const usePostBoardLikeMutation = (boardId: number) => {
  return useMutation({
    mutationFn: () => postBoardLike(boardId),
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
