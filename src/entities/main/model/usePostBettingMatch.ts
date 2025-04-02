import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useBettingMatchArrStore, usePointStore } from '@/shared/stores';
import { BettingFormData } from '@/shared/types/main';
import { postBettingMatch } from '../api/postBettingMatch';

export const usePostBettingMatch = (matchId: number, bettingPoint: number) => {
  const { setBettingMatchArr } = useBettingMatchArrStore();
  const { point, setPoint } = usePointStore();

  return useMutation({
    mutationFn: (data: BettingFormData) => postBettingMatch(matchId, data),
    onSuccess: () => {
      toast.success('베팅이 완료되었습니다.');
      setBettingMatchArr([{ matchId, bettingPoint: bettingPoint }]);
      setPoint(point - bettingPoint);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
