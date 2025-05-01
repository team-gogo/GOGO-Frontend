import { useEffect, useRef } from 'react';
import {
  BallState,
  CupState,
  GameState,
} from '@/shared/types/mini-game/yavarwee';
import { drawBall } from './drawBall';
import { drawCups } from './drawCups';

export function useCanvasAnimation(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  cups: CupState[],
  ball: BallState,
  cupImage: HTMLImageElement | null,
  ballImage: HTMLImageElement | null,
  gameState: GameState,
  setCups: React.Dispatch<React.SetStateAction<CupState[]>>,
  setBall: React.Dispatch<React.SetStateAction<BallState>>,
) {
  const animationFrameRef = useRef(0);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const deltaTime = time - lastTimeRef.current;
      lastTimeRef.current = time;

      let animating = false;

      setCups((prev) =>
        prev.map((cup) => {
          if (cup.animationProgress < 1) {
            const newProgress = Math.min(
              cup.animationProgress + deltaTime / cup.animationDuration,
              1,
            );
            animating = true;
            const t = 1 - Math.pow(1 - newProgress, 2);

            return {
              ...cup,
              x: cup.x + (cup.targetX - cup.x) * t,
              y: cup.y + (cup.targetY - cup.y) * t,
              animationProgress: newProgress,
            };
          }
          return cup;
        }),
      );

      if (gameState === 'showing' && ball.scale < 1) {
        setBall((prev) => {
          const newScale = prev.scale + (deltaTime / 300) * 0.4;
          if (newScale <= 1.2) {
            animating = true;
            return { ...prev, scale: newScale };
          } else {
            return { ...prev, scale: 1 };
          }
        });
      }

      if (canvasRef.current && cupImage && ballImage) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height,
          );

          if (ball.visible) {
            drawBall(ctx, ball, ballImage);
          }

          drawCups(ctx, cups, cupImage);
        }
      }

      if (animating) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [gameState, cups, ball, cupImage, ballImage]);
}
