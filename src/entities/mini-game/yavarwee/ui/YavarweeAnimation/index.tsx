'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

type GameState =
  | 'idle'
  | 'betting'
  | 'showing'
  | 'hiding'
  | 'shuffling'
  | 'selecting'
  | 'result';
type Result = 'correct' | 'wrong' | null;

type Props = {
  gameState: GameState;
  cupPositions: number[];
  ballPosition: number | null;
  userSelection: number | null;
  result: Result;
  selectCup: (index: number) => void;
  startGame: () => void;
};

const YavarweeAnimation = ({
  gameState,
  cupPositions,
  ballPosition,
  userSelection,
  result,
  selectCup,
  startGame,
}: Props) => {
  const cupCoordinates: { x: number }[] = [{ x: -150 }, { x: 0 }, { x: 150 }];

  const isCupRevealed = (originalCupId: number): boolean => {
    const currentCupPosition = cupPositions.indexOf(originalCupId);

    if (gameState === 'showing') {
      return currentCupPosition === ballPosition;
    }

    if (gameState === 'result') {
      if (result === 'correct') {
        return currentCupPosition === userSelection;
      }
      if (result === 'wrong') {
        return originalCupId === ballPosition;
      }
    }

    return false;
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gray-700">
      <div className="relative mb-12 flex h-60 w-full max-w-[600px] items-center justify-center">
        {[0, 1, 2].map((originalCupId) => (
          <motion.div
            key={originalCupId}
            className="absolute w-32 cursor-pointer"
            style={{ top: '50%' }}
            animate={{
              x: cupCoordinates[
                cupPositions.findIndex((v) => v === originalCupId)
              ].x,
              y: isCupRevealed(originalCupId) ? -50 : 0,
              zIndex: isCupRevealed(originalCupId) ? 10 : 1,
              transition: { duration: gameState === 'shuffling' ? 0.5 : 0.3 },
            }}
            onClick={() => selectCup(cupPositions.indexOf(originalCupId))}
          >
            <Image
              src="/cup.png"
              alt={`컵 ${originalCupId + 1}`}
              width={128}
              height={128}
              className="pointer-events-none h-auto w-full select-none"
              draggable="false"
            />
          </motion.div>
        ))}

        {ballPosition !== null && (
          <motion.div
            className="absolute"
            style={{
              bottom: '0px',
              left: `calc(50% + ${
                cupCoordinates[cupPositions.indexOf(ballPosition)]?.x || 0
              }px - 32px)`,
            }}
            initial={{ opacity: gameState === 'showing' ? 1 : 0 }}
            animate={{
              opacity:
                gameState === 'showing' || gameState === 'result' ? 1 : 0,
              scale:
                gameState === 'showing' || gameState === 'result'
                  ? [0.8, 1.2, 1]
                  : [1],
            }}
            transition={{ duration: gameState === 'showing' ? 0.3 : 0.5 }}
          >
            <Image
              src="/ball.png"
              alt="공"
              width={64}
              height={64}
              className="pointer-events-none select-none"
              draggable="false"
            />
          </motion.div>
        )}
      </div>

      <div className="z-10 mt-4 text-center">
        {[
          'betting',
          'showing',
          'hiding',
          'shuffling',
          'selecting',
          'result',
        ].includes(gameState) && (
          <motion.p
            className="text-xl font-bold text-gray-300"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {gameState === 'betting' && '포인트를 배팅해주세요!'}
            {gameState === 'showing' && '공의 위치를 확인하세요!'}
            {gameState === 'hiding' && '공을 숨기는 중...'}
            {gameState === 'shuffling' && '컵을 섞는 중...'}
            {gameState === 'selecting' && '컵을 선택해주세요!'}
            {gameState === 'result' && (
              <span
                className={
                  result === 'correct' ? 'text-green-400' : 'text-red-400'
                }
              >
                {result === 'correct' ? '정답입니다! 🎉' : '틀렸습니다! 😓'}
              </span>
            )}
          </motion.p>
        )}
      </div>

      {gameState === 'idle' && (
        <div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-black/30 backdrop-blur-sm">
          <button onClick={startGame} className="text-h1e text-white">
            게임하기
          </button>
        </div>
      )}
    </div>
  );
};

export default YavarweeAnimation;
