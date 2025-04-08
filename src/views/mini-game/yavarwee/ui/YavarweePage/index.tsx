'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AnimationDisplayContainer } from '@/entities/mini-game';
import {
  YavarweeAnimation,
  YavarweeButton,
} from '@/entities/mini-game/yavarwee';
import { YavarweeForm } from '@/shared/types/mini-game/yavarwee';
import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import { useGetMyPointQuery } from '@/views/mini-game/model/useGetMyPointQuery';
import { useGetMyTicketQuery } from '@/views/mini-game/model/useGetMyTicketQuery';
import { ControlForm } from '@/widgets/mini-game';
import { RoundContainer } from '@/widgets/mini-game/yavarwee';

const YavarweePage = () => {
  const params = useParams<{ stageId: string }>();
  const { stageId } = params;
  const { data: myPointData } = useGetMyPointQuery(stageId);
  const { data: myTicketData } = useGetMyTicketQuery(stageId);
  const { register, watch, setValue } = useForm<YavarweeForm>();

  const serverPoint = myPointData?.point || 0;
  const coinTossTicket = myTicketData?.yavarwee || 0;

  const [gameState, setGameState] = useState<
    'idle' | 'showing' | 'hiding' | 'shuffling' | 'selecting' | 'result'
  >('idle');
  const [ballPosition, setBallPosition] = useState<number | null>(null);
  const [cupPositions, setCupPositions] = useState<number[]>([0, 1, 2]);
  const [userSelection, setUserSelection] = useState<number | null>(null);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);

  const startGame = () => {
    setGameState('showing');
    const randomPosition = Math.floor(Math.random() * 3);
    setBallPosition(randomPosition);
    setCupPositions([0, 1, 2]);
    setUserSelection(null);
    setResult(null);

    setTimeout(() => {
      setGameState('hiding');
      setTimeout(() => {
        setGameState('shuffling');
        performShuffleAnimation();
      }, 1000);
    }, 2000);
  };

  const performShuffleAnimation = () => {
    const current = [...cupPositions];
    const shuffleCount = Math.floor(Math.random() * (16 - 8 + 1)) + 8;
    const shuffles: [number, number][] = [];

    for (let i = 0; i < shuffleCount; i++) {
      const a = Math.floor(Math.random() * 3);
      let b = Math.floor(Math.random() * 3);
      while (a === b) b = Math.floor(Math.random() * 3);
      [current[a], current[b]] = [current[b], current[a]];
      shuffles.push([a, b]);
    }

    let delay = 0;
    shuffles.forEach(([a, b]) => {
      setTimeout(() => {
        setCupPositions((prev) => {
          const next = [...prev];
          [next[a], next[b]] = [next[b], next[a]];
          return next;
        });
      }, delay);
      delay += 600;
    });

    setTimeout(() => {
      setGameState('selecting');
    }, delay);
  };

  const selectCup = (selectedIdx: number) => {
    if (gameState !== 'selecting') return;

    setUserSelection(selectedIdx);
    const originalCupId = cupPositions[selectedIdx];
    const correct = originalCupId === ballPosition;

    setResult(correct ? 'correct' : 'wrong');
    setGameState('result');
  };

  return (
    <div
      className={cn(
        'flex w-full items-center justify-center px-[1rem] py-[80px]',
      )}
    >
      <form
        className={cn(
          'w-full max-w-[1320px] space-y-[80px] mobile:space-y-[40px]',
        )}
      >
        <BackPageButton
          label="야바위"
          type="push"
          path={`/mini-game/${stageId}`}
        />

        <div className="space-y-24">
          <RoundContainer />
          <AnimationDisplayContainer>
            <YavarweeAnimation
              gameState={gameState}
              cupPositions={cupPositions}
              ballPosition={ballPosition}
              userSelection={userSelection}
              result={result}
              selectCup={selectCup}
              startGame={startGame}
            />
          </AnimationDisplayContainer>
        </div>

        <div className={cn('flex', 'w-full', 'justify-center')}>
          <div className={cn('flex', 'w-full', 'justify-evenly')}>
            {['1', '2', '3'].map((num, idx) => (
              <div key={num} className={cn('max-w-[182px]', 'w-full')}>
                <YavarweeButton
                  number={num as '1' | '2' | '3'}
                  selectedNumber={watch('bet')}
                  setValue={(field, value) => {
                    if (gameState === 'selecting') {
                      setValue(field, value);
                      selectCup(idx);
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <ControlForm
          point={serverPoint}
          ticket={coinTossTicket}
          register={register}
          watch={watch}
        />
      </form>
    </div>
  );
};

export default YavarweePage;
