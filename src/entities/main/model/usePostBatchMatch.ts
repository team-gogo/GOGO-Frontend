import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { BatchMatchType } from '@/shared/types/main';
import { postBatchMatch } from '../api/postBatchMatch';

export const usePostBatchMatch = (matchId: number) => {
  return useMutation({
    mutationFn: (data: BatchMatchType) => postBatchMatch(matchId, data),
    onSuccess: () => {
      toast.success('정산이 완료되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
