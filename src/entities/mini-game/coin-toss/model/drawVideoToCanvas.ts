export function drawVideoFrameToCanvas(
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
) {
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
}
