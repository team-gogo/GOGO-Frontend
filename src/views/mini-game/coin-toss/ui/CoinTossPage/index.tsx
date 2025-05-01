'use client';

import { useParams } from 'next/navigation';
import { AnimationDisplayContainer } from '@/entities/mini-game';
import { CoinTossAnimation } from '@/entities/mini-game/coin-toss';
import CoinTossButton from '@/entities/mini-game/coin-toss/ui/CoinTossButton';
import { CoinTossForm } from '@/shared/types/mini-game/coin-toss';
import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import { ControlForm } from '@/widgets/mini-game';
import { useCoinTossController } from '../../model/useCoinTossController';

const CoinTossPage = () => {
  const { stageId } = useParams<{ stageId: string }>();
  const {
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
  } = useCoinTossController(stageId);

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
        <BackPageButton label="코인 토스" type="back" />

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
              isPending={isPending}
            />
            <CoinTossButton
              side="BACK"
              selectedSide={selectedSide}
              setValue={setValue}
              isPlaying={isPlaying}
              isPending={isPending}
            />
          </div>
        </div>

        <ControlForm<CoinTossForm>
          point={localPoint}
          ticket={localCoinTossTicket}
          register={register}
          watch={watch}
          isPending={isPending}
          isPlaying={isPlaying}
          minBetLimit={minBetLimit}
          maxBetLimit={maxBetLimit}
          type="coinToss"
        />
      </form>
    </div>
  );
};

export default CoinTossPage;
