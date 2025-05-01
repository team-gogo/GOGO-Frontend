'use client';

import { useEffect, useState } from 'react';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import { toast } from 'react-toastify';
import { handleFormErrors } from '@/shared/model/formErrorUtils';
import { CoinTossForm } from '@/shared/types/mini-game/coin-toss';
import { useGetBetLimit } from '@/views/mini-game/model/useGetBetLimit';
import { useGetMyPointQuery } from '@/views/mini-game/model/useGetMyPointQuery';
import { useGetMyTicketQuery } from '@/views/mini-game/model/useGetMyTicketQuery';
import { useCoinTossAnimationEndHandler } from './useCoinTossResultHandler';
import { usePostCoinToss } from './usePostCoinToss';

export function useCoinTossController(stageId: string) {
  const { register, handleSubmit, watch, setValue } = useForm<CoinTossForm>();

  const { data: myPointData } = useGetMyPointQuery(stageId);
  const { data: myTicketData } = useGetMyTicketQuery(stageId);
  const { data: betLimitData } = useGetBetLimit(stageId);
  const { mutate: coinToss, isPending } = usePostCoinToss(stageId);

  const [videoSource, setVideoSource] = useState('/BackCoin.mp4');
  const [isPlaying, setIsPlaying] = useState(false);
  const [responseAmount, setResponseAmount] = useState(0);

  const [localPoint, setLocalPoint] = useState(0);
  const [localCoinTossTicket, setLocalCoinTossTicket] = useState(0);

  const serverPoint = myPointData?.point || 0;
  const coinTossTicket = myTicketData?.coinToss || 0;
  const minBetLimit = betLimitData?.coinToss.minBetPoint || 0;
  const maxBetLimit = betLimitData?.coinToss.maxBetPoint || 0;

  const { handleAnimationEnd } = useCoinTossAnimationEndHandler(
    stageId,
    videoSource,
    watch,
    responseAmount,
    setIsPlaying,
  );

  useEffect(() => {
    setLocalPoint(serverPoint);
    setLocalCoinTossTicket(coinTossTicket);
  }, [serverPoint, coinTossTicket]);

  register('bet', { required: '동전 면을 선택해주세요' });

  const onSubmit: SubmitHandler<CoinTossForm> = (data) => {
    const formatData = {
      amount: Number(data.amount),
      bet: data.bet,
    };

    setLocalPoint((prev) => prev - formatData.amount);
    setLocalCoinTossTicket((prev) => prev - 1);

    coinToss(formatData, {
      onSuccess: (response) => {
        const { result, amount } = response;
        const appearedSide = result
          ? data.bet
          : data.bet === 'FRONT'
            ? 'BACK'
            : 'FRONT';

        setResponseAmount(amount);
        setVideoSource(
          appearedSide === 'FRONT' ? '/FrontCoin.mp4' : '/BackCoin.mp4',
        );
        setIsPlaying(true);
      },
      onError: (error) => {
        setLocalPoint((prev) => prev + formatData.amount);
        setLocalCoinTossTicket((prev) => prev + 1);
        toast.error(error.message || '코인토스 요청 중 오류가 발생했습니다.');
      },
    });
  };

  const onError = (errors: FieldErrors<CoinTossForm>) => {
    handleFormErrors(errors, toast.error);
  };

  return {
    register,
    handleSubmit,
    watch,
    setValue,
    onSubmit,
    onError,
    handleAnimationEnd,
    videoSource,
    isPlaying,
    isPending,
    localPoint,
    localCoinTossTicket,
    minBetLimit,
    maxBetLimit,
  };
}
