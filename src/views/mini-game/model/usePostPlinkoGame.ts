import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { PlinkoFormType } from '@/shared/types/mini-game';
import { postPlinkoGame } from '../api/postPlinkoGame';

export const usePostPlinkoGame = (stageId: number) => {
  return useMutation({
    mutationFn: (data: PlinkoFormType) => postPlinkoGame(stageId, data),
    onSuccess: () => {},
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
