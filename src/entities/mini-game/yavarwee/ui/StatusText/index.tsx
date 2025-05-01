'use client';

import { GameState, Result } from '@/shared/types/mini-game/yavarwee';
import { cn } from '@/shared/utils/cn';
import { getStatusText } from '../../model/getStatusText';

type Props = {
  gameState: GameState;
  result: Result;
};

export function StatusText({ gameState, result }: Props) {
  const text = getStatusText(gameState, result);

  if (!text) return null;

  return (
    <p
      className={cn('text-body1e', 'text-gray-300')}
      style={{ animation: 'fadeInUp 0.3s ease-out' }}
    >
      {gameState === 'result' ? (
        <span
          className={
            result === 'correct' ? 'text-system-success' : 'text-system-error'
          }
        >
          {text}
        </span>
      ) : (
        text
      )}
    </p>
  );
}
