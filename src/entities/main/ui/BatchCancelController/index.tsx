import { useState, useEffect, useRef } from 'react';
import { TimerIcon } from '@/shared/assets/svg';
import {
  useCheckAgainModalStore,
  useExpiredDateStore,
  useMatchBatchArrStore,
  useMatchTeamStore,
} from '@/shared/stores';
import { cn } from '@/shared/utils/cn';

interface BatchCancelController {
  tempPointExpiredDate?: string;
  matchId: number;
}

const BatchCancelController = ({
  tempPointExpiredDate,
  matchId,
}: BatchCancelController) => {
  const { setIsCheckAgainModalOpen } = useCheckAgainModalStore();
  const { matchBatchArr, setMatchBatchArr } = useMatchBatchArrStore();
  const { setTempPointExpiredDate } = useExpiredDateStore();
  const { setMatchId } = useMatchTeamStore();

  const updatedMatchBatchArr = matchBatchArr.map((item) =>
    item.matchId === matchId ? { ...item, isEnd: false } : item,
  );

  const [timeLeft, setTimeLeft] = useState<number>(5 * 60);
  const [rotation, setRotation] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleTimeExpired = () => {
      setMatchBatchArr(updatedMatchBatchArr);
    };

    if (intervalRef.current) clearInterval(intervalRef.current);

    if (tempPointExpiredDate) {
      const currentTime = new Date();
      const expiredTime = new Date(tempPointExpiredDate);
      const timeDifference = expiredTime.getTime() - currentTime.getTime();
      const totalSeconds = Math.max(Math.floor(timeDifference / 1000), 0);
      setTimeLeft(totalSeconds);

      if (totalSeconds === 0) {
        handleTimeExpired();
        return;
      }
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current!);
          handleTimeExpired();
          return 0;
        }
        return prevTime - 1;
      });

      setRotation((prevRotation) => prevRotation + 180);
    }, 1000);

    return () => clearInterval(intervalRef.current!);
  }, [tempPointExpiredDate, updatedMatchBatchArr]);

  const formatTimeLeft = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={cn(
        'absolute inset-0 flex items-center justify-center rounded-xl bg-gray-900/50 backdrop-blur-sm',
      )}
    >
      <div
        className={cn('flex flex-col items-center justify-center gap-[0.5rem]')}
      >
        <button
          onClick={() => {
            const newExpiredDate = new Date(
              Date.now() + timeLeft * 1000,
            ).toISOString();
            setTempPointExpiredDate(newExpiredDate);
            setMatchId(matchId);
            setIsCheckAgainModalOpen(true);
          }}
          className={cn('text-h4e text-white')}
        >
          정산 취소하기
        </button>
        <div className={cn('flex items-center gap-[1rem]')}>
          <div
            className={cn('transition-transform duration-500')}
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <TimerIcon />
          </div>
          <p className={cn('w-[6rem] text-h4s text-system-error')}>
            {formatTimeLeft(timeLeft)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BatchCancelController;
