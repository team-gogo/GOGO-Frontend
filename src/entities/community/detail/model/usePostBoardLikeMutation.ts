import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postBoardLike } from '../api/postBoardLike';

export const usePostBoardLikeMutation = (
  boardId: number,
  setLiked: (liked: boolean) => void,
  setLikeCountState: React.Dispatch<React.SetStateAction<number>>,
) => {
  return useMutation({
    mutationFn: () => postBoardLike(boardId),
    onSuccess: (data: { isLiked: boolean }) => {
      if (data?.isLiked !== undefined) {
        setLiked(data.isLiked);
        setLikeCountState((prev: number) =>
          data.isLiked ? prev + 1 : prev - 1,
        );
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
