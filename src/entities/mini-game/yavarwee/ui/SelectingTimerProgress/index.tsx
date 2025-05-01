'use client';

import { cn } from '@/shared/utils/cn';

type Props = {
  timerProgress: number;
};

export function SelectingTimerProgress({ timerProgress }: Props) {
  const getTimerColor = () => {
    if (timerProgress > 66) return 'bg-green-500';
    if (timerProgress > 33) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="mx-auto mt-2 h-10 w-full max-w-[500px] overflow-hidden rounded-sm bg-gray-600">
      <div
        className={cn(
          'h-2.5',
          'transition-all',
          'duration-75',
          getTimerColor(),
        )}
        style={{ width: `${timerProgress}%` }}
      />
    </div>
  );
}
