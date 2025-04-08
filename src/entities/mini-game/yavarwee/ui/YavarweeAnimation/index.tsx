'use client';

import React, { useEffect, useRef, useState } from 'react';

type GameState =
  | 'idle'
  | 'betting'
  | 'showing'
  | 'hiding'
  | 'shuffling'
  | 'selecting'
  | 'result'
  | 'round';
type Result = 'correct' | 'wrong' | null;

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

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 240;
const CUP_WIDTH = 128;
const CUP_HEIGHT = 128;
const BALL_SIZE = 64;

interface CupState {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  zIndex: number;
  originalId: number;
  animationProgress: number;
  animationDuration: number;
}

interface BallState {
  x: number;
  y: number;
  visible: boolean;
  scale: number;
}

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cupImageRef = useRef<HTMLImageElement | null>(null);
  const ballImageRef = useRef<HTMLImageElement | null>(null);
  const animationFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const cupCoordinates = [
    { x: CANVAS_WIDTH / 2 - 150 },
    { x: CANVAS_WIDTH / 2 },
    { x: CANVAS_WIDTH / 2 + 150 },
  ];

  const [cups, setCups] = useState<CupState[]>([
    {
      x: cupCoordinates[0].x,
      y: CANVAS_HEIGHT / 2,
      targetX: cupCoordinates[0].x,
      targetY: CANVAS_HEIGHT / 2,
      zIndex: 1,
      originalId: 0,
      animationProgress: 1,
      animationDuration: 300,
    },
    {
      x: cupCoordinates[1].x,
      y: CANVAS_HEIGHT / 2,
      targetX: cupCoordinates[1].x,
      targetY: CANVAS_HEIGHT / 2,
      zIndex: 1,
      originalId: 1,
      animationProgress: 1,
      animationDuration: 300,
    },
    {
      x: cupCoordinates[2].x,
      y: CANVAS_HEIGHT / 2,
      targetX: cupCoordinates[2].x,
      targetY: CANVAS_HEIGHT / 2,
      zIndex: 1,
      originalId: 2,
      animationProgress: 1,
      animationDuration: 300,
    },
  ]);

  const [ball, setBall] = useState<BallState>({
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2 + 30,
    visible: false,
    scale: 1,
  });

  useEffect(() => {
    const cupImage = new Image();
    cupImage.src = '/cup.png';
    cupImage.onload = () => {
      cupImageRef.current = cupImage;
    };

    const ballImage = new Image();
    ballImage.src = '/ball.png';
    ballImage.onload = () => {
      ballImageRef.current = ballImage;
    };

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  useEffect(() => {
    const newCups = [...cups];

    cupPositions.forEach((positionId, index) => {
      const cupIndex = cups.findIndex((cup) => cup.originalId === positionId);
      if (cupIndex !== -1) {
        const targetX = cupCoordinates[index].x;
        let targetY = CANVAS_HEIGHT / 2;
        let zIndex = 1;

        const isCupRevealed = (() => {
          if (gameState === 'showing') {
            return index === ballPosition;
          }

          if (gameState === 'result') {
            if (result === 'correct') {
              return index === userSelection;
            }
            if (result === 'wrong') {
              return positionId === ballPosition;
            }
          }

          return false;
        })();

        if (isCupRevealed) {
          targetY = CANVAS_HEIGHT / 2 - 50;
          zIndex = 10;
        }

        newCups[cupIndex] = {
          ...newCups[cupIndex],
          targetX,
          targetY,
          zIndex,
          animationProgress: 0,
          animationDuration: gameState === 'shuffling' ? shuffleDuration : 300,
        };
      }
    });

    setCups(newCups);

    if (ballPosition !== null) {
      const cupIndex = cupPositions.indexOf(ballPosition);
      const ballX = cupCoordinates[cupIndex].x;

      setBall((prev) => ({
        ...prev,
        x: ballX,
        visible: gameState === 'showing' || gameState === 'result',
        scale: gameState === 'showing' ? 0.8 : 1,
      }));
    }
  }, [gameState, cupPositions, ballPosition, userSelection, result]);

  useEffect(() => {
    const animate = (time: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = time;
      }

      const deltaTime = time - lastTimeRef.current;
      lastTimeRef.current = time;

      let animating = false;
      setCups((prevCups) => {
        return prevCups.map((cup) => {
          if (cup.animationProgress < 1) {
            const newProgress = Math.min(
              cup.animationProgress + deltaTime / cup.animationDuration,
              1,
            );
            animating = true;

            const t = 1 - Math.pow(1 - newProgress, 2);

            const x = cup.x + (cup.targetX - cup.x) * t;
            const y = cup.y + (cup.targetY - cup.y) * t;

            return {
              ...cup,
              x,
              y,
              animationProgress: newProgress,
            };
          }
          return cup;
        });
      });

      if (gameState === 'showing' && ball.scale < 1) {
        setBall((prev) => {
          const newScale = prev.scale + (deltaTime / 300) * 0.4;
          if (newScale <= 1.2) {
            animating = true;
            return {
              ...prev,
              scale: newScale,
            };
          } else {
            return {
              ...prev,
              scale: 1,
            };
          }
        });
      }

      renderCanvas();

      if (animating) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [gameState, cups, ball]);

  const renderCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !cupImageRef.current || !ballImageRef.current)
      return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const sortedCups = [...cups].sort((a, b) => a.zIndex - b.zIndex);

    if (ball.visible) {
      ctx.save();
      ctx.translate(ball.x, ball.y + 30);
      ctx.scale(ball.scale, ball.scale);
      ctx.drawImage(
        ballImageRef.current,
        -BALL_SIZE / 2,
        -BALL_SIZE / 2,
        BALL_SIZE,
        BALL_SIZE,
      );
      ctx.restore();
    }

    sortedCups.forEach((cup) => {
      ctx.drawImage(
        cupImageRef.current!,
        cup.x - CUP_WIDTH / 2,
        cup.y - CUP_HEIGHT / 2,
        CUP_WIDTH,
        CUP_HEIGHT,
      );
    });
  };

  const getStatusText = () => {
    switch (gameState) {
      case 'betting':
        return '포인트를 배팅해주세요!';
      case 'showing':
        return '공의 위치를 확인하세요!';
      case 'hiding':
        return '공을 숨기는 중...';
      case 'shuffling':
        return '컵을 섞는 중...';
      case 'selecting':
        return '컵을 선택해주세요!';
      case 'result':
        return result === 'correct' ? '정답입니다! 🎉' : '틀렸습니다! 😓';
      default:
        return '';
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gray-700">
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="max-w-full"
      />

      <div className="z-10 mt-4 text-center">
        {[
          'betting',
          'showing',
          'hiding',
          'shuffling',
          'selecting',
          'result',
        ].includes(gameState) && (
          <p
            className="text-xl font-bold text-gray-300"
            style={{
              animation: 'fadeInUp 0.3s ease-out',
            }}
          >
            {gameState === 'result' ? (
              <span
                className={
                  result === 'correct' ? 'text-green-400' : 'text-red-400'
                }
              >
                {getStatusText()}
              </span>
            ) : (
              getStatusText()
            )}
          </p>
        )}
      </div>

      {gameState === 'idle' && (
        <div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-black/30 backdrop-blur-sm">
          <button onClick={startGame} className="text-h1e text-white">
            게임하기
          </button>
        </div>
      )}

      {gameState === 'round' && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-8 rounded-2xl bg-black/30 backdrop-blur-sm">
          <p className="text-h1e text-white">다음 라운드에 도전하겠습니까?</p>
          <div className="flex items-center gap-24">
            <button
              className="rounded px-6 py-2 text-body1s text-gray-300 hover:text-system-success"
              onClick={onNextRound}
            >
              YES
            </button>
            <button
              className="rounded px-6 py-2 text-body1s text-gray-300 hover:text-system-error"
              onClick={onStopGame}
            >
              NO
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default YavarweeAnimation;
