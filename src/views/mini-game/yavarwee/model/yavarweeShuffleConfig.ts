export function getShuffleCountForRound(round: number): number {
  const ranges: Record<number, [number, number]> = {
    1: [12, 16],
    2: [16, 20],
    3: [20, 25],
    4: [25, 30],
    5: [35, 45],
  };
  const [min, max] = ranges[round] || [12, 16];
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getShuffleAnimationDurationForRound(round: number): number {
  const durations: Record<number, number> = {
    1: 800,
    2: 600,
    3: 400,
    4: 300,
    5: 200,
  };
  return durations[round] ?? 1000;
}
