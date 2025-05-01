'use client';

import { cn } from '@/shared/utils/cn';

type Props = {
  onNextRound: () => void;
  onStopGame: () => void;
};

export function RoundOverlay({ onNextRound, onStopGame }: Props) {
  return (
    <div
      className={cn(
        'absolute',
        'inset-0',
        'z-20',
        'flex',
        'flex-col',
        'items-center',
        'justify-center',
        'gap-8',
        'rounded-lg',
        'bg-black/30',
        'backdrop-blur-sm',
      )}
    >
      <p className={cn('pad:text-h1e', 'text-white', 'text-body2e')}>
        다음 라운드에 도전하겠습니까?
      </p>
      <div className={cn('flex', 'items-center', 'gap-24')}>
        <button
          className={cn(
            'rounded',
            'px-6',
            'py-2',
            'pad:text-body1s',
            'text-body3e',
            'text-gray-300',
            'hover:text-system-success',
          )}
          onClick={onNextRound}
        >
          YES
        </button>
        <button
          className={cn(
            'rounded',
            'px-6',
            'py-2',
            'pad:text-body1s',
            'text-body3e',
            'text-gray-300',
            'hover:text-system-error',
          )}
          onClick={onStopGame}
        >
          NO
        </button>
      </div>
    </div>
  );
}
