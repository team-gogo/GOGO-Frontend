import { CupState } from '@/shared/types/mini-game/yavarwee';

export function drawCups(
  ctx: CanvasRenderingContext2D,
  cups: CupState[],
  cupImage: HTMLImageElement,
) {
  const sortedCups = [...cups].sort((a, b) => a.zIndex - b.zIndex);

  sortedCups.forEach((cup) => {
    ctx.drawImage(cupImage, cup.x - 105, cup.y - 105, 210, 210);
  });
}
