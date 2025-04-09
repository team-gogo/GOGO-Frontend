'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
import { useBetYavarweeMutation } from '../../model/useBetYavarweeMutation';
import { useComfirmYavarweeMutation } from '../../model/useComfirmYavarweeMutation';

const YavarweePage = () => {
  const params = useParams<{ stageId: string }>();
  const { stageId } = params;
  const { data: myPointData } = useGetMyPointQuery(stageId);
  const { data: myTicketData } = useGetMyTicketQuery(stageId);
  const { register, handleSubmit, watch, setValue, reset } =
    useForm<YavarweeForm>();

  const serverPoint = myPointData?.point || 0;
  const coinTossTicket = myTicketData?.yavarwee || 0;

  const [gameState, setGameState] = useState<
    | 'idle'
    | 'betting'
    | 'showing'
    | 'hiding'
    | 'shuffling'
    | 'selecting'
    | 'result'
    | 'round'
  >('idle');

  const [ballPosition, setBallPosition] = useState<number | null>(null);
  const [cupPositions, setCupPositions] = useState<number[]>([0, 1, 2]);
  const [userSelection, setUserSelection] = useState<number | null>(null);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  const [round, setRound] = useState<number>(1);
  const [betUuid, setBetUuid] = useState<string | null>(null);

  const { mutate: betYavarwee } = useBetYavarweeMutation(stageId);
  const { mutate: comfirmYavarwee } = useComfirmYavarweeMutation(stageId);

  const startGameWithRound = (currentRound: number) => {
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
        performShuffleAnimation(currentRound);
      }, 1000);
    }, 2000);
  };

  const getShuffleCountForRound = (round: number): number => {
    const ranges: Record<number, [number, number]> = {
      1: [10, 12],
      2: [12, 16],
      3: [16, 20],
      4: [20, 25],
      5: [35, 45],
    };

    const range = ranges[round];

    const [min, max] = range;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getShuffleAnimationDurationForRound = (round: number): number => {
    const durations: Record<number, number> = {
      1: 1000,
      2: 800,
      3: 600,
      4: 400,
      5: 300,
    };

    return durations[round] || 1000;
  };
  const performShuffleAnimation = (currentRound: number) => {
    const current = [...cupPositions];
    const shuffleCount = getShuffleCountForRound(currentRound);
    const shuffleDuration = getShuffleAnimationDurationForRound(currentRound);
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
      delay += shuffleDuration;
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

    setTimeout(() => {
      if (correct) {
        if (round >= 5) {
          comfirmYavarwee({
            uuid: betUuid!,
            round,
            status: true,
          });
          toast.success('야바위 라운드 종료 포인트를 정산합니다.');
          setRound(1);
          reset();
          setGameState('idle');
        } else {
          setGameState('round');
        }
      } else {
        comfirmYavarwee({
          uuid: betUuid!,
          round,
          status: false,
        });
        toast.error('야바위 배팅에 실패했습니다.');
        setRound(1);
        reset();
        setGameState('idle');
      }
    }, 1500);
  };

  const handleNextRound = () => {
    const nextRound = round + 1;
    setRound(nextRound);
    startGameWithRound(nextRound);
  };

  const handleStopGame = () => {
    comfirmYavarwee({
      uuid: betUuid!,
      round,
      status: true,
    });
    toast.success('야바위 라운드 종료 포인트를 정산합니다.');
    setRound(1);
    reset();
    setGameState('idle');
  };

  return (
    <div
      className={cn(
        'flex',
        'w-full',
        'items-center',
        'justify-center',
        'px-[1rem]',
        'py-[80px]',
      )}
    >
      <form
        onSubmit={handleSubmit((data) => {
          if (gameState === 'betting') {
            const parsedData = {
              ...data,
              amount: Number(data.amount),
            };

            betYavarwee(parsedData, {
              onSuccess: (res) => {
                setBetUuid(res.uuid);
                startGameWithRound(round);
              },
            });
          }
        })}
        className={cn(
          'w-full',
          'max-w-[1320px]',
          'space-y-[80px]',
          'mobile:space-y-[40px]',
        )}
      >
        <BackPageButton
          label="야바위"
          type="push"
          path={`/mini-game/${stageId}`}
        />

        <div className={cn('space-y-24')}>
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
        </div>

        <div className={cn('flex', 'w-full', 'justify-center')}>
          <div className={cn('flex', 'w-full', 'justify-evenly', 'gap-16')}>
            {['1', '2', '3'].map((num, idx) => (
              <div key={num} className={cn('w-full', 'max-w-[182px]')}>
                <YavarweeButton
                  number={num as '1' | '2' | '3'}
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
          isPlaying={gameState !== 'betting'}
          type="coinToss"
        />
      </form>
    </div>
  );
};

export default YavarweePage;
