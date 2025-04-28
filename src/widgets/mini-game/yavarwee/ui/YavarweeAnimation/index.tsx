'use client';

import React, { useEffect } from 'react';
import {
  IdleOverlay,
  RoundOverlay,
  SelectingTimerProgress,
  StatusText,
  useCanvasAnimation,
} from '@/entities/mini-game/yavarwee';
import { GameState, Result } from '@/shared/types/mini-game/yavarwee';
import { cn } from '@/shared/utils/cn';
import { updateCupsAndBall } from '../../model/useUpdateCupsAndBall';
import { useYavarweeBall } from '../../model/useYavarweeBall';
import { useYavarweeCups } from '../../model/useYavarweeCups';
import { useYavarweeImages } from '../../model/useYavarweeImages';
import { useYavarweeTimer } from '../../model/useYavarweeTimer';

type Props = {
  gameState: GameState;
  cupPositions: number[];
  ballPosition: number | null;
  userSelection: number | null;
  result: Result;
  startGame: () => void;
  onNextRound: () => void;
  onStopGame: () => void;
  shuffleDuration: number;
};

const YavarweeAnimation = ({
  gameState,
  cupPositions,
  ballPosition,
  userSelection,
  result,
  startGame,
  onNextRound,
  onStopGame,
  shuffleDuration,
}: Props) => {
  const { cups, setCups, cupCoordinates } = useYavarweeCups();
  const { ball, setBall } = useYavarweeBall();
  const { canvasRef, cupImageRef, ballImageRef } = useYavarweeImages();
  const { timerProgress } = useYavarweeTimer(gameState);

  useCanvasAnimation(
    canvasRef,
    cups,
    ball,
    cupImageRef.current,
    ballImageRef.current,
    gameState,
    setCups,
    setBall,
  );

  useEffect(() => {
    updateCupsAndBall(
      cups,
      setCups,
      ball,
      setBall,
      cupPositions,
      ballPosition,
      userSelection,
      result,
      gameState,
      shuffleDuration,
      cupCoordinates,
    );
  }, [gameState, cupPositions, ballPosition, userSelection, result]);

  return (
    <div
      className={cn(
        'relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gray-700',
      )}
    >
      <canvas ref={canvasRef} width={900} height={300} className="max-w-full" />

      <div className="z-10 mt-4 w-full space-y-16 px-4 text-center">
        {[
          'betting',
          'showing',
          'hiding',
          'shuffling',
          'selecting',
          'result',
        ].includes(gameState) && (
          <StatusText gameState={gameState} result={result} />
        )}
        {gameState === 'selecting' && userSelection === null && (
          <SelectingTimerProgress timerProgress={timerProgress} />
        )}
      </div>

      {gameState === 'idle' && <IdleOverlay onStart={startGame} />}
      {gameState === 'round' && (
        <RoundOverlay onNextRound={onNextRound} onStopGame={onStopGame} />
      )}
    </div>
  );
};

export default YavarweeAnimation;
