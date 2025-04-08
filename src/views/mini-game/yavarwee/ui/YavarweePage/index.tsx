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
import { useGetMyPointQuery } from '@/views/mini-game/model/useGetMyPointQuery';
import { useGetMyTicketQuery } from '@/views/mini-game/model/useGetMyTicketQuery';
import { ControlForm } from '@/widgets/mini-game';
import { RoundContainer } from '@/widgets/mini-game/yavarwee';

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

  const amount = watch('amount');

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

    // 라운드별 딜레이 맵
    const roundSpeedMap: Record<number, number> = {
      1: 300,
      2: 250,
      3: 200,
      4: 150,
      5: 100,
    };

    const delayPerShuffle = roundSpeedMap[round] || 100;
    let totalDelay = 0;

    shuffles.forEach(([a, b]) => {
      setTimeout(() => {
        setCupPositions((prev) => {
          const next = [...prev];
          [next[a], next[b]] = [next[b], next[a]];
          return next;
        });
      }, totalDelay);
      totalDelay += delayPerShuffle;
    });

    setTimeout(() => {
      setGameState('selecting');
    }, totalDelay);
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
          console.log({
            status: true,
            round,
            amount: Number(amount),
          });
          toast.success('야바위 라운드 종료 포인트를 정산합니다.');
          setRound(1);
          reset();
          setGameState('idle');
        } else {
          setGameState('round');
        }
      } else {
        console.log({
          status: false,
          round,
          amount: Number(amount),
        });
        toast.error('야바위 배팅에 실패했습니다.');
        setRound(1);
        reset();
        setGameState('idle');
      }
    }, 1500);
  };

  const handleNextRound = () => {
    setRound((prev) => prev + 1);
    startGame();
  };

  const handleStopGame = () => {
    console.log({
      status: true,
      round,
      amount: Number(amount),
    });
    toast.success('야바위 라운드 종료 포인트를 정산합니다.');
    setRound(1);
    reset();
    setGameState('idle');
  };

  return (
    <div className="flex w-full items-center justify-center px-[1rem] py-[80px]">
      <form
        onSubmit={handleSubmit(() => {
          if (gameState === 'betting') {
            startGame();
          }
        })}
        className="w-full max-w-[1320px] space-y-[80px] mobile:space-y-[40px]"
      >
        <BackPageButton
          label="야바위"
          type="push"
          path={`/mini-game/${stageId}`}
        />

        <div className="space-y-24">
          <RoundContainer currentRound={round} />
          <AnimationDisplayContainer>
            <YavarweeAnimation
              gameState={gameState}
              cupPositions={cupPositions}
              ballPosition={ballPosition}
              userSelection={userSelection}
              result={result}
              selectCup={selectCup}
              startGame={() => setGameState('betting')}
              onNextRound={handleNextRound}
              onStopGame={handleStopGame}
            />
          </AnimationDisplayContainer>
        </div>

        <div className="flex w-full justify-center">
          <div className="flex w-full justify-evenly">
            {['1', '2', '3'].map((num, idx) => (
              <div key={num} className="w-full max-w-[182px]">
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
        />
      </form>
    </div>
  );
};

export default YavarweePage;
