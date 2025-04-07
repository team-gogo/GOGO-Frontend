'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AnimationDisplayContainer } from '@/entities/mini-game';
import { CoinTossAnimation } from '@/entities/mini-game/coin-toss';
import CoinTossButton from '@/entities/mini-game/coin-toss/ui/CoinTossButton';
import { handleFormErrors } from '@/shared/model/formErrorUtils';
import { CoinTossForm } from '@/shared/types/mini-game/conin-toss';
import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import { useGetMyPointQuery } from '@/views/mini-game/model/useGetMyPointQuery';
import { useGetMyTicketQuery } from '@/views/mini-game/model/useGetMyTicketQuery';
import { ControlForm } from '@/widgets/mini-game';
import { usePostCoinToss } from '../../model/usePostCoinToss';

const CoinTossPage = () => {
  const params = useParams<{ stageId: string }>();
  const { stageId } = params;
  const [videoSource, setVideoSource] = useState<string>('/BackCoin.mp4');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const { register, handleSubmit, watch, setValue } = useForm<CoinTossForm>();
  const queryClient = useQueryClient();

  const { data: myPointData } = useGetMyPointQuery(stageId);
  const { data: myTicketData } = useGetMyTicketQuery(stageId);
  const { mutate: coinToss, isPending } = usePostCoinToss(stageId);

  const [localPoint, setLocalPoint] = useState<number>(0);
  const [localCoinTossTicket, setLocalCoinTossTicket] = useState<number>(0);

  const [responseAmount, setResponseAmount] = useState<number>(0);

  const serverPoint = myPointData?.point || 0;
  const coinTossTicket = myTicketData?.coinToss || 0;

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

  const handleAnimationEnd = () => {
    setIsPlaying(false);

    const result = videoSource.includes('FrontCoin') ? 'FRONT' : 'BACK';
    const bet = watch('bet');
    const didWin = result === bet;
    const userInputAmount = Number(watch('amount'));

    if (didWin) {
      toast.success(
        `배팅 성공! ${responseAmount.toLocaleString()} 포인트 획득`,
      );
    } else {
      toast.error(
        `배팅 실패... ${userInputAmount.toLocaleString()} 포인트 차감`,
      );
    }

    queryClient.invalidateQueries({
      queryKey: ['getMyPoint', stageId],
    });
    queryClient.invalidateQueries({
      queryKey: ['getMyTicket', stageId],
    });
  };

  const selectedSide = watch('bet');

  return (
    <div
      className={cn(
        'flex',
        'w-full',
        'justify-center',
        'items-center',
        'py-[80px]',
        'px-[1rem]',
      )}
    >
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className={cn(
          'w-full',
          'max-w-[1320px]',
          'space-y-[80px]',
          'mobile:space-y-[40px]',
        )}
      >
        <BackPageButton
          label="코인 토스"
          type="push"
          path={`/mini-game/${stageId}`}
        />

        <AnimationDisplayContainer>
          <CoinTossAnimation
            videoSource={videoSource}
            isPlaying={isPlaying}
            onAnimationEnd={handleAnimationEnd}
          />
        </AnimationDisplayContainer>

        <div className={cn('w-full', 'flex', 'justify-center')}>
          <div
            className={cn(
              'flex',
              'justify-between',
              'mobile:gap-[80px]',
              'w-[444px]',
              'gap-20',
            )}
          >
            <CoinTossButton
              side="FRONT"
              selectedSide={selectedSide}
              setValue={setValue}
              isPlaying={isPlaying}
            />
            <CoinTossButton
              side="BACK"
              selectedSide={selectedSide}
              setValue={setValue}
              isPlaying={isPlaying}
            />
          </div>
        </div>

        <ControlForm
          point={localPoint}
          coinTossTicket={localCoinTossTicket}
          register={register}
          watch={watch}
          isPending={isPending}
          isPlaying={isPlaying}
        />
      </form>
    </div>
  );
};

export default CoinTossPage;
