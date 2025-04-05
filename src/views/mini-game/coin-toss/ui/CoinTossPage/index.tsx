'use client';

import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AnimationDisplayContainer } from '@/entities/mini-game';
import { CoinTossAnimation } from '@/entities/mini-game/coin-toss';
import CoinTossButton from '@/entities/mini-game/coin-toss/ui/CoinTossButton';
import { handleFormErrors } from '@/shared/model/formErrorUtils';
import { CoinTossForm } from '@/shared/types/mini-game/conin-toss';
import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import { ControlForm } from '@/widgets/mini-game';

const CoinTossPage = () => {
  const params = useParams<{ stageId: string }>();
  const { stageId } = params;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoSource, setVideoSource] = useState<string>('/BackCoin.mp4');
  const { register, handleSubmit, watch, setValue } = useForm<CoinTossForm>();

  register('bet', { required: '동전 면을 선택해주세요' });

  const handlePlay = () => {
    const randomSource =
      Math.random() > 0.5 ? '/BackCoin.mp4' : '/FrontCoin.mp4';
    setVideoSource(randomSource);

    const video = videoRef.current;
    if (video) {
      video.load();
      video.play();
    }
  };

  const onSubmit: SubmitHandler<CoinTossForm> = (data) => {
    const formatData = {
      amount: data.amount,
      bet: data.bet,
    };
    console.log(formatData);
    handlePlay();
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
          />
          <CoinTossButton
            side="BACK"
            selectedSide={selectedSide}
            setValue={setValue}
          />
        </div>
      </div>

      <ControlForm register={register} onSubmit={onSubmit} />
    </form>
  );
};

export default CoinTossPage;
