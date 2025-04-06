import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { CoinTossForm } from '@/shared/types/mini-game/conin-toss';
import { postCoinToss } from '../api/postCoinToss';

export const usePostCoinToss = (stageId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CoinTossForm) => postCoinToss(stageId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['getMyTicket', stageId] });
      return data;
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
