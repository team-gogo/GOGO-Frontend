import { useState } from 'react';
import { CupState } from '@/shared/types/mini-game/yavarwee';

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 300;
const CUP_SPACING = 240;

export function useYavarweeCups() {
  const cupCoordinates = [
    { x: CANVAS_WIDTH / 2 - CUP_SPACING },
    { x: CANVAS_WIDTH / 2 },
    { x: CANVAS_WIDTH / 2 + CUP_SPACING },
  ];

  const [cups, setCups] = useState<CupState[]>([
    {
      x: cupCoordinates[0].x,
      y: CANVAS_HEIGHT / 2,
      targetX: cupCoordinates[0].x,
      targetY: CANVAS_HEIGHT / 2,
      zIndex: 1,
      originalId: 0,
      animationProgress: 1,
      animationDuration: 300,
    },
    {
      x: cupCoordinates[1].x,
      y: CANVAS_HEIGHT / 2,
      targetX: cupCoordinates[1].x,
      targetY: CANVAS_HEIGHT / 2,
      zIndex: 1,
      originalId: 1,
      animationProgress: 1,
      animationDuration: 300,
    },
    {
      x: cupCoordinates[2].x,
      y: CANVAS_HEIGHT / 2,
      targetX: cupCoordinates[2].x,
      targetY: CANVAS_HEIGHT / 2,
      zIndex: 1,
      originalId: 2,
      animationProgress: 1,
      animationDuration: 300,
    },
  ]);

  return { cups, setCups, cupCoordinates };
}
