import { useState, useEffect } from 'react';
import { TimerIcon, WarningIcon } from '@/shared/assets/svg';
import {
  useExpiredDateStore,
  useMatchBatchArrStore,
  useMatchTeamStore,
} from '@/shared/stores';
import Button from '@/shared/ui/button';
import ModalLayout from '@/shared/ui/modalLayout';
import { cn } from '@/shared/utils/cn';
import { usePostCancleBatch } from '../../model/usePostCancleBatch';

interface BatchCancelModalProps {
  onClose: () => void;
}

const BatchCancelModal = ({ onClose }: BatchCancelModalProps) => {
  const { matchId } = useMatchTeamStore();
  const { mutate: PostCanclebatch } = usePostCancleBatch(matchId);
  const { tempPointExpiredDate } = useExpiredDateStore();
  const { matchBatchArr, setMatchBatchArr } = useMatchBatchArrStore();

  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [rotation, setRotation] = useState<number>(0);

  useEffect(() => {
    if (!tempPointExpiredDate) return;

    const updateTimeLeft = () => {
      const now = new Date().getTime();
      const expiredTime = new Date(tempPointExpiredDate).getTime();
      const diff = Math.max(expiredTime - now, 0);
      setTimeLeft(Math.floor(diff / 1000));
    };

    updateTimeLeft();
    const interval = setInterval(() => {
      updateTimeLeft();
      setRotation((prevRotation) => prevRotation + 180);
    }, 1000);

    return () => clearInterval(interval);
  }, [tempPointExpiredDate]);

  const formatTimeLeft = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (timeLeft <= 0) {
        onClose();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [timeLeft]);

  const updatedMatchBatchArr = matchBatchArr.map((item) =>
    item.matchId === matchId ? { ...item, isEnd: false } : item,
  );

  return (
    <ModalLayout
      title={'정말 정산을 취소하시겠습니까?'}
      onClose={onClose}
      containerClassName={cn(
        'rounded-lg',
        'bg-gray-700',
        'tablet:px-[2.5rem]',
        'tablet:py-[2.25rem]',
        'px-[1rem]',
        'py-[1.25rem]',
        'max-w-[38.75rem]',
        'w-full',
        'space-y-24',
        'm-20',
      )}
    >
      <div
        className={cn(
          'flex',
          'flex-col',
          'justify-center',
          'items-center',
          'pad:pt-[4rem]',
          'pt-[1rem]',
        )}
      >
        <div
          className={cn(
            'flex',
            'flex-col',
            'justify-center',
            'items-center',
            'pad:gap-[5.5rem]',
            'gap-[2rem]',
            'w-full',
          )}
        >
          <div className={cn('flex', 'items-center', 'gap-[1rem]')}>
            <div
              className={cn('transition-transform', 'duration-500')}
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <TimerIcon className="h-[2.5rem] w-[2.5rem] tablet:h-[3.75rem] tablet:w-[3.75rem]" />
            </div>
            <p
              className={cn(
                'tablet:text-h1e',
                'text-h3e',
                'text-system-error',
                'w-[8rem]',
              )}
            >
              {formatTimeLeft(timeLeft)}
            </p>
          </div>
          <div
            className={cn(
              'w-full',
              'flex',
              'gap-[0.75rem]',
              'items-center',
              'flex-col',
            )}
          >
            <Button
              onClick={() => {
                PostCanclebatch();
                setMatchBatchArr(updatedMatchBatchArr);
                onClose();
              }}
              bg="bg-system-error"
            >
              정산 취소하기
            </Button>
            <div
              className={cn(
                'w-full',
                'flex',
                'items-center',
                'gap-[0.5rem]',
                'justify-center',
              )}
            >
              <WarningIcon />
              <p
                className={cn(
                  'pad:text-caption1s',
                  'text-caption3s',
                  'text-gray-500',
                )}
              >
                정산 취소 후 3분 뒤 &apos;정산 완료&apos;를 하면 정산이
                완료됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default BatchCancelModal;
