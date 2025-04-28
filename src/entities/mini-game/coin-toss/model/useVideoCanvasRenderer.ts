import { useEffect, RefObject, useRef } from 'react';

interface Args {
  videoRef: RefObject<HTMLVideoElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
  videoSource: string;
  isPlaying: boolean;
  onAnimationEnd?: () => void;
}

export function useVideoCanvasRenderer({
  videoRef,
  canvasRef,
  videoSource,
  isPlaying,
  onAnimationEnd,
}: Args) {
  const frameId = useRef<number>();

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    let mounted = true;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawLoop = () => {
      if (!mounted || !isPlaying) return;
      if (video.readyState < 2) {
        frameId.current = requestAnimationFrame(drawLoop);
        return;
      }

      const vw = video.videoWidth;
      const vh = video.videoHeight;
      const cw = canvas.width;
      const ch = canvas.height;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(video, 0, vh - vh, vw, vh, 0, 0, cw, ch);

      frameId.current = requestAnimationFrame(drawLoop);
    };

    const handleLoadedData = () => {
      if (isPlaying) {
        video.play();
        drawLoop();
      } else {
        if (video.readyState >= 2) {
          const vw = video.videoWidth;
          const vh = video.videoHeight;
          const cw = canvas.width;
          const ch = canvas.height;

          ctx.clearRect(0, 0, cw, ch);
          ctx.drawImage(video, 0, vh - vh, vw, vh, 0, 0, cw, ch);
        }
      }
    };

    const handleEnded = () => {
      if (frameId.current) cancelAnimationFrame(frameId.current);
      onAnimationEnd?.();
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('ended', handleEnded);

    video.src = videoSource;
    video.load();

    return () => {
      mounted = false;
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('ended', handleEnded);
      if (frameId.current) cancelAnimationFrame(frameId.current);
    };
  }, [videoSource, isPlaying, onAnimationEnd, videoRef, canvasRef]);
}
