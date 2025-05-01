'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { AnimationDisplayContainer } from '@/entities/mini-game';
import { YavarweeButton } from '@/entities/mini-game/yavarwee';
import { YavarweeForm } from '@/shared/types/mini-game/yavarwee';
import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import { useGetBetLimit } from '@/views/mini-game/model/useGetBetLimit';
import { useGetMyPointQuery } from '@/views/mini-game/model/useGetMyPointQuery';
import { useGetMyTicketQuery } from '@/views/mini-game/model/useGetMyTicketQuery';
import { ControlForm } from '@/widgets/mini-game';
import {
  RoundContainer,
  YavarweeAnimation,
} from '@/widgets/mini-game/yavarwee';
import { useYavarweeController } from '../../model/useYavarweeController';
import { useYavarweeFormHandler } from '../../model/useYavarweeFormHandler';
import { getShuffleAnimationDurationForRound } from '../../model/yavarweeShuffleConfig';

export default function YavarweePage() {
  const { stageId } = useParams<{ stageId: string }>();
  const { data: pointData } = useGetMyPointQuery(stageId);
  const { data: ticketData } = useGetMyTicketQuery(stageId);
  const { data: betLimit } = useGetBetLimit(stageId);

  const { register, handleSubmit, watch, setValue, reset } =
    useForm<YavarweeForm>();
  const [localPoint, setLocalPoint] = useState(pointData?.point || 0);
  const [localTicket, setLocalTicket] = useState(ticketData?.yavarwee || 0);

  useEffect(() => {
    setLocalPoint(pointData?.point || 0);
  }, [pointData]);
  useEffect(() => {
    setLocalTicket(ticketData?.yavarwee || 0);
  }, [ticketData]);

  const {
    gameState,
    round,
    cupPositions,
    ballPosition,
    userSelection,
    result,
    setGameState,
    selectCup,
    startGameWithRound,
    handleNextRound,
    handleStopGame,
    setBetUuid,
  } = useYavarweeController(stageId, reset);

  const { onSubmit, isPending } = useYavarweeFormHandler({
    stageId,
    round,
    gameState,
    watch,
    setLocalPoint,
    setLocalTicket,
    setBetUuid,
    startGameWithRound,
  });

  return (
    <div
      className={cn(
        'flex',
        'w-full',
        'justify-center',
        'px-[1rem]',
        'py-[80px]',
      )}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          'w-full',
          'max-w-[1320px]',
          'space-y-[80px]',
          'mobile:space-y-[40px]',
        )}
      >
        <BackPageButton label="야바위" type="back" />

        <RoundContainer currentRound={round} />

        <AnimationDisplayContainer>
          <YavarweeAnimation
            gameState={gameState}
            cupPositions={cupPositions}
            ballPosition={ballPosition}
            userSelection={userSelection}
            result={result}
            startGame={() => setGameState('betting')}
            onNextRound={handleNextRound}
            onStopGame={handleStopGame}
            shuffleDuration={getShuffleAnimationDurationForRound(round)}
          />
        </AnimationDisplayContainer>

        <div className={cn('flex', 'w-full', 'justify-evenly', 'gap-16')}>
          {['1', '2', '3'].map((num, idx) => (
            <div key={num} className={cn('w-full', 'max-w-[182px]')}>
              <YavarweeButton
                number={num as '1' | '2' | '3'}
                onBet={(v) => {
                  if (gameState === 'selecting') {
                    setValue('bet', v);
                    selectCup(idx);
                  }
                }}
                isPending={isPending}
              />
            </div>
          ))}
        </div>

        <ControlForm
          point={localPoint}
          ticket={localTicket}
          register={register}
          watch={watch}
          isPending={isPending}
          isPlaying={gameState !== 'betting'}
          minBetLimit={betLimit?.yavarwee.minBetPoint || 0}
          maxBetLimit={betLimit?.yavarwee.maxBetPoint || 0}
          type="yavarwee"
        />
      </form>
    </div>
  );
}
