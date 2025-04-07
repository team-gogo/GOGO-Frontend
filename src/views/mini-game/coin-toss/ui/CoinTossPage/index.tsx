'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoSource, setVideoSource] = useState<string>('/BackCoin.mp4');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const { register, handleSubmit, watch, setValue } = useForm<CoinTossForm>();
  const queryClient = useQueryClient();

  const { data: myPointData } = useGetMyPointQuery(stageId);
  const { data: myTicketData } = useGetMyTicketQuery(stageId);
  const { mutate: coinToss, isPending } = usePostCoinToss(stageId);

  const [localPoint, setLocalPoint] = useState<number>(0);

  const serverPoint = myPointData?.point || 0;
  const coinTossTicket = myTicketData?.coinToss || 0;

  useEffect(() => {
    setLocalPoint(serverPoint);
  }, [serverPoint]);

  register('bet', { required: '동전 면을 선택해주세요' });

  useEffect(() => {
    const video = videoRef.current;
    if (video && isPlaying) {
      video.load();
      video.play();
    }
  }, [videoSource, isPlaying]);

  const onSubmit: SubmitHandler<CoinTossForm> = (data) => {
    const formatData = {
      amount: Number(data.amount),
      bet: data.bet,
    };

    setLocalPoint((prev) => prev - formatData.amount);

    coinToss(formatData, {
      onSuccess: (response) => {
        const { result, amount } = response;

        if (data.bet === 'FRONT') {
          setVideoSource(result ? '/FrontCoin.mp4' : '/BackCoin.mp4');
        } else {
          setVideoSource(result ? '/BackCoin.mp4' : '/FrontCoin.mp4');
        }

        setIsPlaying(true);

        const video = videoRef.current;
        if (video) {
          video.onended = () => {
            setIsPlaying(false);

            const didWin =
              (data.bet === 'FRONT' && result) ||
              (data.bet === 'BACK' && !result);

            if (didWin) {
              toast.success(
                `배팅 성공! ${amount.toLocaleString()} 포인트 획득`,
              );
            } else {
              toast.error(
                `배팅 실패... ${formatData.amount.toLocaleString()} 포인트 차감`,
              );
            }

            queryClient.invalidateQueries({
              queryKey: ['getMyPoint', stageId],
            });
          };
        }
      },
      onError: (error) => {
        setLocalPoint((prev) => prev + formatData.amount);
        toast.error(error.message || '코인토스 요청 중 오류가 발생했습니다.');
      },
    });
  };

  const onError = (errors: FieldErrors<CoinTossForm>) => {
    handleFormErrors(errors, toast.error);
  };

  const selectedSide = watch('bet');

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className={cn('w-full', 'max-w-[1320px]', 'space-y-[80px]')}
    >
      <BackPageButton
        label="코인 토스"
        type="push"
        path={`/mini-game/${stageId}`}
      />

      <AnimationDisplayContainer>
        <CoinTossAnimation videoRef={videoRef} videoSource={videoSource} />
      </AnimationDisplayContainer>

      <div className={cn('w-full', 'flex', 'justify-center')}>
        <div
          className={cn(
            'flex',
            'justify-between',
            'gap-[80px]',
            'w-[444px]',
            'mobile:gap-[40px]',
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
        coinTossTicket={coinTossTicket}
        register={register}
        watch={watch}
        isPending={isPending}
        isPlaying={isPlaying}
      />
    </form>
  );
};

export default CoinTossPage;
