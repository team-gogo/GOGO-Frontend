'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useComfirmYavarweeMutation } from '../model/useComfirmYavarweeMutation';
import {
  getShuffleAnimationDurationForRound,
  getShuffleCountForRound,
} from './yavarweeShuffleConfig';

export function useYavarweeController(stageId: string, reset: () => void) {
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
  const [round, setRound] = useState(1);
  const [ballPosition, setBallPosition] = useState<number | null>(null);
  const [cupPositions, setCupPositions] = useState<number[]>([0, 1, 2]);
  const [userSelection, setUserSelection] = useState<number | null>(null);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  const [betUuid, setBetUuid] = useState<string | null>(null);

  const { mutate: comfirmYavarwee } = useComfirmYavarweeMutation(stageId);

  useEffect(() => {
    if (gameState !== 'selecting') return;
    const timer = setTimeout(() => {
      if (userSelection === null && betUuid) {
        comfirmYavarwee(
          { uuid: betUuid, round, status: false },
          {
            onSuccess: () => {
              toast.error(
                '컵 선택 제한 시간(3초)을 지나서 야바위를 종료합니다.',
              );
              setRound(1);
              reset();
              setGameState('idle');
            },
          },
        );
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [gameState, userSelection, betUuid, round, comfirmYavarwee, reset]);

  const performShuffleAnimation = (currentRound: number) => {
    const count = getShuffleCountForRound(currentRound);
    const duration = getShuffleAnimationDurationForRound(currentRound);
    let delay = 0;

    for (let i = 0; i < count; i++) {
      const a = Math.floor(Math.random() * 3);
      let b = Math.floor(Math.random() * 3);
      while (a === b) b = Math.floor(Math.random() * 3);

      setTimeout(() => {
        setCupPositions((prev) => {
          const next = [...prev];
          [next[a], next[b]] = [next[b], next[a]];
          return next;
        });
      }, delay);

      delay += duration;
    }

    setTimeout(() => setGameState('selecting'), delay);
  };

  const startGameWithRound = (currentRound: number) => {
    setGameState('showing');
    setBallPosition(Math.floor(Math.random() * 3));
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

  const selectCup = (idx: number) => {
    if (gameState !== 'selecting') return;
    setUserSelection(idx);

    const correct = cupPositions[idx] === ballPosition;
    setResult(correct ? 'correct' : 'wrong');
    setGameState('result');

    setTimeout(() => {
      if (correct) {
        if (round >= 5 && betUuid) {
          comfirmYavarwee(
            { uuid: betUuid, round, status: true },
            {
              onSuccess: () => {
                toast.success('야바위 라운드 종료 포인트를 정산합니다.');
                setRound(1);
                reset();
                setGameState('idle');
              },
            },
          );
        } else {
          setGameState('round');
        }
      } else if (betUuid) {
        comfirmYavarwee(
          { uuid: betUuid, round, status: false },
          {
            onSuccess: () => {
              toast.error('야바위 배팅에 실패했습니다.');
              setRound(1);
              reset();
              setGameState('idle');
            },
          },
        );
      }
    }, 1500);
  };

  const handleNextRound = () => {
    const next = round + 1;
    setRound(next);
    startGameWithRound(next);
  };

  const handleStopGame = () => {
    if (!betUuid) return;
    comfirmYavarwee(
      { uuid: betUuid, round, status: true },
      {
        onSuccess: () => {
          toast.success('야바위 라운드 종료 포인트를 정산합니다.');
          setRound(1);
          reset();
          setGameState('idle');
        },
      },
    );
  };

  return {
    gameState,
    round,
    cupPositions,
    ballPosition,
    userSelection,
    result,
    betUuid,
    setBetUuid,
    setGameState,
    startGameWithRound,
    selectCup,
    handleNextRound,
    handleStopGame,
  };
}
