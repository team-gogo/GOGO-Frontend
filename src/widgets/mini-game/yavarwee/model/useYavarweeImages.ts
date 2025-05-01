'use client';

import { useEffect, useRef } from 'react';

export function useYavarweeImages() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cupImageRef = useRef<HTMLImageElement | null>(null);
  const ballImageRef = useRef<HTMLImageElement | null>(null);

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
  }, []);

  return { canvasRef, cupImageRef, ballImageRef };
}
