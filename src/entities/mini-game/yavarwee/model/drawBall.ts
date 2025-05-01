import { BallState } from '@/shared/types/mini-game/yavarwee';

export function drawBall(
  ctx: CanvasRenderingContext2D,
  ball: BallState,
  ballImage: HTMLImageElement,
) {
  ctx.save();
  ctx.translate(ball.x, ball.y + 30);
  ctx.scale(ball.scale, ball.scale);
  ctx.drawImage(ballImage, -37.5, -37.5, 75, 75);
  ctx.restore();
}
