export const formatPoint = (point: number) => {
  if (point >= 100000000) {
    return `${Math.floor(point / 10000000) / 10}억P`;
  } else if (point >= 10000) {
    return `${Math.floor(point / 1000) / 10}만P`;
  }
  return `${point}P`;
};
