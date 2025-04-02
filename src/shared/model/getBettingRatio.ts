export const getBettingRatio = (teamPoint: number, totalPoint: number) => {
  if (totalPoint === 0) return '0%';
  return `${Math.round((teamPoint / totalPoint) * 100)}%`;
};
