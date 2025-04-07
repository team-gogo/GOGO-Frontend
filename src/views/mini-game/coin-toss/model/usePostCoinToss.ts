import { useMutation } from '@tanstack/react-query';
import { CoinTossForm } from '@/shared/types/mini-game/coin-toss';
import { postCoinToss } from '../api/postCoinToss';

export const usePostCoinToss = (stageId: string) => {
  return useMutation({
    mutationFn: (data: CoinTossForm) => postCoinToss(stageId, data),
    onSuccess: (data) => {
      return data;
    },
  });
};
