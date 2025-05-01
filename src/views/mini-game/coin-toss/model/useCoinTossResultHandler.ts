'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { UseFormWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CoinTossForm } from '@/shared/types/mini-game/coin-toss';

export function useCoinTossAnimationEndHandler(
  stageId: string,
  videoSource: string,
  watch: UseFormWatch<CoinTossForm>,
  responseAmount: number,
  setIsPlaying: (playing: boolean) => void,
) {
  const queryClient = useQueryClient();

  const handleAnimationEnd = useCallback(() => {
    setIsPlaying(false);

    const result = videoSource.includes('FrontCoin') ? 'FRONT' : 'BACK';
    const bet = watch('bet');
    const userInputAmount = Number(watch('amount'));
    const didWin = result === bet;

    if (didWin) {
      toast.success(
        `배팅 성공! ${responseAmount.toLocaleString()} 포인트 획득`,
      );
    } else {
      toast.error(
        `배팅 실패... ${userInputAmount.toLocaleString()} 포인트 차감`,
      );
    }

    queryClient.invalidateQueries({ queryKey: ['getMyPoint', stageId] });
    queryClient.invalidateQueries({ queryKey: ['getMyTicket', stageId] });
  }, [setIsPlaying, videoSource, watch, responseAmount, queryClient, stageId]);

  return { handleAnimationEnd };
}
