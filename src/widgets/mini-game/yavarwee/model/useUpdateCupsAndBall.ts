import {
  CupState,
  BallState,
  GameState,
  Result,
} from '@/shared/types/mini-game/yavarwee';

export function updateCupsAndBall(
  cups: CupState[],
  setCups: (value: CupState[]) => void,
  ball: BallState,
  setBall: (value: BallState) => void,
  cupPositions: number[],
  ballPosition: number | null,
  userSelection: number | null,
  result: Result,
  gameState: GameState,
  shuffleDuration: number,
  cupCoordinates: { x: number }[],
) {
  const newCups = [...cups];

  cupPositions.forEach((positionId, index) => {
    const cupIndex = cups.findIndex((cup) => cup.originalId === positionId);
    if (cupIndex !== -1) {
      const targetX = cupCoordinates[index].x;
      let targetY = 300 / 2;
      let zIndex = 1;

      const isCupRevealed = (() => {
        if (gameState === 'showing') {
          return index === ballPosition;
        }
        if (gameState === 'result') {
          if (result === 'correct') return index === userSelection;
          if (result === 'wrong') return positionId === ballPosition;
        }
        return false;
      })();

      if (isCupRevealed) {
        targetY = 300 / 2 - 75;
        zIndex = 10;
      }

      newCups[cupIndex] = {
        ...newCups[cupIndex],
        targetX,
        targetY,
        zIndex,
        animationProgress: 0,
        animationDuration: gameState === 'shuffling' ? shuffleDuration : 300,
      };
    }
  });

  setCups(newCups);

  if (ballPosition !== null) {
    const cupIndex = cupPositions.indexOf(ballPosition);
    const ballX = cupCoordinates[cupIndex].x;

    setBall({
      ...ball,
      x: ballX,
      visible: gameState === 'showing' || gameState === 'result',
      scale: gameState === 'showing' ? 0.8 : 1,
    });
  }
}
