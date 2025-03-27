import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postCancleBatch } from '../api/postCancleBatch';

export const usePostCancleBatch = (matchId: number) => {
  return useMutation({
    mutationFn: () => postCancleBatch(matchId),
    onSuccess: () => {
      toast.success('정산 롤백이 완료되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
