import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useAlarmClickStore, useMatchNoticeStore } from '@/shared/stores';
import { MatchNoticeType } from '@/shared/types/main';
import { patchMatchNotice } from '../api/patchMatchNotice';

export const usePatchMatchNotice = (matchId: number) => {
  const { setIsAlarmClicked } = useAlarmClickStore();
  const { matchNoticeArr, setMatchNoticeArr } = useMatchNoticeStore();
  return useMutation({
    mutationFn: (data: MatchNoticeType) => patchMatchNotice(data, matchId),
    onSuccess: () => {
      toast.success('매치 알림 전환이 완료되었습니다.');
      const updatedMatchNoticeArr = matchNoticeArr.map((item) =>
        item.matchId === matchId ? { ...item, isNotice: !item.isNotice } : item,
      );

      setMatchNoticeArr(updatedMatchNoticeArr);
    },
    onError: (error: Error) => {
      setIsAlarmClicked(false);
      toast.error(error.message);
    },
  });
};
