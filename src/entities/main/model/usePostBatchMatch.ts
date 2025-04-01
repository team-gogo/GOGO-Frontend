import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useMatchBatchArrStore } from '@/shared/stores';
import { BatchMatchType } from '@/shared/types/main';
import { postBatchMatch } from '../api/postBatchMatch';

export const usePostBatchMatch = (matchId: number) => {
  const { matchBatchArr, setMatchBatchArr } = useMatchBatchArrStore();
  return useMutation({
    mutationFn: (data: BatchMatchType) => postBatchMatch(matchId, data),
    onSuccess: () => {
      toast.success('정산이 완료되었습니다.');
      const updatedMatchBatchArr = matchBatchArr.map((item) =>
        item.matchId === matchId ? { ...item, isEnd: true } : item,
      );

      setMatchBatchArr(updatedMatchBatchArr);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
