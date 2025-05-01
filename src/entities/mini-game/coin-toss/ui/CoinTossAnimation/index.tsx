'use client';

import React from 'react';
import { cn } from '@/shared/utils/cn';
import { useVideoCanvasPlayer } from '../../model/useVideoCanvasPlayer';

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
  const { videoRef, canvasRef } = useVideoCanvasPlayer({
    videoSource,
    isPlaying,
    onAnimationEnd,
  });

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
