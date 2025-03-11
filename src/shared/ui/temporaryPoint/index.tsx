'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/shared/utils/cn';
import { formatPoint } from '@/shared/utils/formatPoint';

interface TemPoraryPoint {
  point: number;
}

const TemporaryPoint = ({ point }: TemPoraryPoint) => {
  const [timeLeft, setTimeLeft] = useState(300);
  const [isSuccess, setIsSuccess] = useState(true); //60초 아래로 내려감을 확인함

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    if (timeLeft <= 60) {
      setIsSuccess(false);
    }

    return () => clearInterval(timer);
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
      <p className={cn('text-body2s', 'text-white')}>{formatPoint(point)}</p>
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
