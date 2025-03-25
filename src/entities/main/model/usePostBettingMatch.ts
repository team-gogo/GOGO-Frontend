import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { BettingFormData } from '@/shared/types/main';
import { postBettingMatch } from '../api/postBettingMatch';

export const usePostBettingMatch = (matchId: number) => {
  return useMutation({
    mutationFn: (data: BettingFormData) => postBettingMatch(matchId, data),
    onSuccess: () => {
      toast.success('베팅이 완료되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
