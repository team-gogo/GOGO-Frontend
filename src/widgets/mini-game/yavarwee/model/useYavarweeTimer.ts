'use client';

import { useEffect, useState, useRef } from 'react';
import { GameState } from '@/shared/types/mini-game/yavarwee';

const SELECTION_TIMER_DURATION = 3000;

export function useYavarweeTimer(gameState: GameState) {
  const [timerProgress, setTimerProgress] = useState<number>(100);
  const timerStartTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (gameState !== 'selecting') return;

    const now = Date.now();
    timerStartTimeRef.current = now;
    setTimerProgress(100);

    const updateInterval = 30;

    const interval = setInterval(() => {
      const elapsedTime = Date.now() - (timerStartTimeRef.current || now);
      const remainingTime = Math.max(0, SELECTION_TIMER_DURATION - elapsedTime);
      const newProgress = (remainingTime / SELECTION_TIMER_DURATION) * 100;

      setTimerProgress(newProgress);

      if (remainingTime <= 0) {
        clearInterval(interval);
      }
    }, updateInterval);

    return () => clearInterval(interval);
  }, [gameState]);

  return { timerProgress };
}
