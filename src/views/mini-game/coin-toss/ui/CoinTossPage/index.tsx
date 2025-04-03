'use client';

import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AnimationDisplayContainer } from '@/entities/mini-game';
import { CoinTossAnimation } from '@/entities/mini-game/coin-toss';
import { handleFormErrors } from '@/shared/model/formErrorUtils';
import { CoinTossForm } from '@/shared/types/mini-game/conin-toss';
import BackPageButton from '@/shared/ui/backPageButton';
import Button from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';
import { ControlForm } from '@/widgets/mini-game';

const CoinTossPage = () => {
  const params = useParams<{ stageId: string }>();
  const { stageId } = params;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoSource, setVideoSource] = useState<string>('/BackCoin.mp4');
  const { register, handleSubmit, watch, setValue } = useForm<CoinTossForm>();

  register('side', { required: '동전 면을 선택해주세요' });

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
    console.log('Submitted Points:', data.amount);
    console.log('Selected Side:', data.side);
    handlePlay();
  };

  const onError = (errors: FieldErrors<CoinTossForm>) => {
    handleFormErrors(errors, toast.error);
  };
  const selectedSide = watch('side');

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
          <Button
            onClick={() => setValue('side', 'front')}
            bg={selectedSide !== 'front' ? 'bg-black-800' : undefined}
            border={selectedSide === 'front' ? undefined : 'border-white'}
          >
            앞면
          </Button>

          <Button
            onClick={() => setValue('side', 'back')}
            bg={selectedSide !== 'back' ? 'bg-black-800' : undefined}
            border={selectedSide === 'back' ? undefined : 'border-white'}
          >
            뒷면
          </Button>
        </div>
      </div>

      <ControlForm register={register} onSubmit={onSubmit} />
    </form>
  );
};

export default CoinTossPage;
