export const formatPoint = (point: number) => {
  if (point >= 100000000) {
    return `${(point / 100000000).toFixed(1)}억P`;
  } else if (point >= 1000000) {
    return `${(point / 1000000).toFixed(1)}백만P`;
  } else if (point >= 10000) {
    return `${(point / 10000).toFixed(1)}만P`;
  }
  return `${point}P`;
};
