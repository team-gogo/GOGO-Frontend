import { useState } from 'react';
import { BallState } from '@/shared/types/mini-game/yavarwee';

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 300;

export function useYavarweeBall() {
  const [ball, setBall] = useState<BallState>({
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2 + 30,
    visible: false,
    scale: 1,
  });

  return { ball, setBall };
}
