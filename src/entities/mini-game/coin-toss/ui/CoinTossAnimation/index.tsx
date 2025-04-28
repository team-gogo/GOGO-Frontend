'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/shared/utils/cn';

interface CoinTossAnimationProps {
  isPlaying: boolean;
  videoSource: string;
  onAnimationEnd?: () => void;
}

const CoinTossAnimation = ({
  isPlaying,
  videoSource,
  onAnimationEnd,
}: CoinTossAnimationProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number>();
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    let isMounted = true;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawToCanvas = () => {
      if (!video || !canvas || !ctx) return;
      if (video.readyState < 2) return;

      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const cropWidth = videoWidth;
      const cropHeight = videoHeight;
      const centerX = videoWidth * 0.5;
      const centerY = videoHeight * 1;
      const sx = Math.max(0, centerX - cropWidth / 2);
      const sy = Math.max(0, centerY - cropHeight / 2);
      const sw = Math.min(cropWidth, videoWidth - sx);
      const sh = Math.min(cropHeight, videoHeight - sy);

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(video, sx, sy, sw, sh, 0, 0, canvasWidth, canvasHeight);

      if (isMounted && isPlaying) {
        animationFrameId.current = requestAnimationFrame(drawToCanvas);
      }
    };

    const drawInitialFrame = () => {
      if (!video || !canvas || !ctx) return;
      if (video.readyState < 2) return;

      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const cropWidth = videoWidth;
      const cropHeight = videoHeight;
      const centerX = videoWidth * 0.5;
      const centerY = videoHeight * 1;
      const sx = Math.max(0, centerX - cropWidth / 2);
      const sy = Math.max(0, centerY - cropHeight / 2);
      const sw = Math.min(cropWidth, videoWidth - sx);
      const sh = Math.min(cropHeight, videoHeight - sy);

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(video, sx, sy, sw, sh, 0, 0, canvasWidth, canvasHeight);
    };

    const handleLoadedData = () => {
      if (isPlaying) {
        video.play();
        drawToCanvas();
      } else {
        drawInitialFrame();
      }
    };

    const handleEnded = () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      onAnimationEnd?.();
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('ended', handleEnded);

    video.src = videoSource;
    video.load();

    return () => {
      isMounted = false;
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('ended', handleEnded);
      if (animationFrameId.current)
        cancelAnimationFrame(animationFrameId.current);
    };
  }, [videoSource, isPlaying, onAnimationEnd]);

  return (
    <div className={cn('relative', 'rounded-lg')}>
      <canvas
        ref={canvasRef}
        className={cn(
          'aspect-video',
          'h-auto',
          'w-full',
          'rounded-lg',
          'object-cover',
        )}
        width={1980}
        height={1080}
      />
      <video
        ref={videoRef}
        className="hidden"
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
};

export default CoinTossAnimation;
