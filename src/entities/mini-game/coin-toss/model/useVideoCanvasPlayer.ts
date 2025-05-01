'use client';

import { useEffect, useRef } from 'react';
import { drawVideoFrameToCanvas } from './drawVideoToCanvas';

interface UseVideoCanvasPlayerProps {
  videoSource: string;
  isPlaying: boolean;
  onAnimationEnd?: () => void;
}

export function useVideoCanvasPlayer({
  videoSource,
  isPlaying,
  onAnimationEnd,
}: UseVideoCanvasPlayerProps) {
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

    const drawVideoFrames = () => {
      if (!video || !canvas || !ctx) return;
      if (video.readyState < 2) return;

      drawVideoFrameToCanvas(video, canvas, ctx);

      if (isMounted && isPlaying) {
        animationFrameId.current = requestAnimationFrame(drawVideoFrames);
      }
    };

    const drawInitialFrame = () => {
      if (!video || !canvas || !ctx) return;
      if (video.readyState < 2) return;

      drawVideoFrameToCanvas(video, canvas, ctx);
    };

    const handleLoadedData = () => {
      if (isPlaying) {
        video.play();
        drawVideoFrames();
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

  return { videoRef, canvasRef };
}
