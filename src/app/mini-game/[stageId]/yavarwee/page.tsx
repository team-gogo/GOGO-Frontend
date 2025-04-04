'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';

type GameState =
  | 'idle'
  | 'showing'
  | 'hiding'
  | 'shuffling'
  | 'selecting'
  | 'result';
type Result = 'correct' | 'wrong' | null;

const ShellGame = () => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [ballPosition, setBallPosition] = useState<number | null>(null);
  const [cupPositions, setCupPositions] = useState<number[]>([0, 1, 2]);
  const [userSelection, setUserSelection] = useState<number | null>(null);
  const [result, setResult] = useState<Result>(null);

  const cupCoordinates: { x: number }[] = [{ x: -150 }, { x: 0 }, { x: 150 }];

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
    const shuffles: [number, number][] = [];
    const currentPositions = [...cupPositions];

    const shuffleCount = Math.floor(Math.random() * (16 - 8 + 1)) + 8;

    for (let i = 0; i < shuffleCount; i++) {
      const idx1 = Math.floor(Math.random() * 3);
      let idx2 = Math.floor(Math.random() * 3);

      while (idx1 === idx2) {
        idx2 = Math.floor(Math.random() * 3);
      }

      const temp = currentPositions[idx1];
      currentPositions[idx1] = currentPositions[idx2];
      currentPositions[idx2] = temp;

      shuffles.push([idx1, idx2]);
    }

    let delay = 0;
    shuffles.forEach((swap) => {
      setTimeout(() => {
        setCupPositions((prevPositions) => {
          const newPositions = [...prevPositions];
          const temp = newPositions[swap[0]];
          newPositions[swap[0]] = newPositions[swap[1]];
          newPositions[swap[1]] = temp;
          return newPositions;
        });
      }, delay);
      delay += 600;
    });

    setTimeout(() => {
      setGameState('selecting');
    }, delay);
  };

  const selectCup = (index: number) => {
    if (gameState !== 'selecting') return;

    setUserSelection(index);

    const isCorrect = ballPosition === cupPositions[index];

    setResult(isCorrect ? 'correct' : 'wrong');
    setGameState('result');
  };

  const isCupRevealed = (index: number): boolean => {
    const currentPosition = cupPositions.indexOf(index);

    if (gameState === 'showing' && currentPosition === ballPosition) {
      return true;
    }

    if (gameState === 'result') {
      if (result === 'correct' && index === userSelection) {
        return true;
      }
      if (result === 'wrong' && currentPosition === ballPosition) {
        return true;
      }
    }

    return false;
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4">
      <div className="relative mb-12 flex h-60 w-full max-w-[600px] items-center justify-center">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="absolute w-32 cursor-pointer"
            style={{ top: '50%' }}
            animate={{
              x: cupCoordinates[cupPositions.indexOf(index)].x,
              y: isCupRevealed(index) ? -50 : 0,
              zIndex: isCupRevealed(index) ? 10 : 1,
              transition: { duration: gameState === 'shuffling' ? 0.5 : 0.3 },
            }}
            onClick={() => selectCup(index)}
          >
            <Image
              src="/cup.png"
              alt={`컵 ${index + 1}`}
              width={128}
              height={128}
              className="h-auto w-full"
            />
          </motion.div>
        ))}

        {ballPosition !== null && (
          <motion.div
            className="absolute"
            style={{
              bottom: '0px',
              left: `calc(50% + ${cupCoordinates[ballPosition].x}px - 32px)`,
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
            <Image src="/ball.png" alt="공" width={64} height={64} />
          </motion.div>
        )}
      </div>

      <div className="mt-4 text-center">
        {gameState === 'idle' && (
          <button
            onClick={startGame}
            className="rounded-lg bg-blue-500 px-6 py-3 font-bold text-white shadow-lg transition-colors hover:bg-blue-600"
          >
            게임 시작
          </button>
        )}

        {gameState === 'selecting' && (
          <div className="mt-4 flex justify-center space-x-4">
            {[0, 1, 2].map((index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => selectCup(index)}
                className="rounded-lg bg-green-500 px-5 py-3 font-bold text-white shadow-md transition-colors hover:bg-green-600"
              >
                {index + 1}번 컵
              </motion.button>
            ))}
          </div>
        )}

        {['showing', 'hiding', 'shuffling', 'result'].includes(gameState) && (
          <motion.p
            className="text-xl font-bold text-gray-300"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {gameState === 'showing' && '공의 위치를 확인하세요!'}
            {gameState === 'hiding' && '공을 숨기는 중...'}
            {gameState === 'shuffling' && '컵을 섞는 중...'}
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
    </div>
  );
};

export default ShellGame;
