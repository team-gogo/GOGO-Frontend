'use client';

import { cn } from '@/shared/utils/cn';

type Props = {
  onStart: () => void;
};

export function IdleOverlay({ onStart }: Props) {
  return (
    <div
      className={cn(
        'absolute',
        'inset-0',
        'z-20',
        'flex',
        'items-center',
        'justify-center',
        'rounded-lg',
        'bg-black/30',
        'backdrop-blur-sm',
      )}
    >
      <button
        onClick={onStart}
        className={cn('pad:text-h1e', 'text-white', 'text-body1e')}
      >
        게임하기
      </button>
    </div>
  );
}
