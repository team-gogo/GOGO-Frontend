'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/shared/utils/cn';

interface TemPoraryPoint {
  tempPoint: number;
  expiredDate: string;
  tempPointId: number;
  onExpire: (id: number) => void;
}

const TemporaryPoint = ({
  tempPoint,
  expiredDate,
  tempPointId,
  onExpire,
}: TemPoraryPoint) => {
  const [timeLeft, setTimeLeft] = useState(300);
  const [isSuccess, setIsSuccess] = useState(true); //60초 아래로 내려감을 확인함

  useEffect(() => {
    const expiredTime = new Date(expiredDate).getTime();
    const currentTime = new Date().getTime();
    const initialTimeLeft = Math.max(
      0,
      Math.floor((expiredTime - currentTime) / 1000),
    );

    setTimeLeft(initialTimeLeft);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          onExpire(tempPointId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [expiredDate]);

  useEffect(() => {
    setIsSuccess(timeLeft > 60);
  }, [timeLeft]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div
      className={cn(
        'flex',
        'p-[0.5rem]',
        'px-[0.75rem]',
        'gap-[0.5625rem]',
        'items-center',
        'rounded-xl',
        'border-solid',
        'border-1',
        isSuccess ? 'border-system-success' : 'border-system-error',
        'w-fit',
      )}
    >
      <p className={cn('text-body2s', 'text-white')}>
        {tempPoint.toLocaleString()}
      </p>
      <p
        className={cn(
          'text-body3s',
          isSuccess ? 'text-system-success' : 'text-system-error',
          'w-[2.8125rem]',
        )}
      >
        {formatTime(timeLeft)}
      </p>
    </div>
  );
};

export default TemporaryPoint;
