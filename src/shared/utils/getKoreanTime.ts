const getKoreanTime = (date: Date) => {
  const koreaTimeOffset = 9 * 60;
  const koreaDate = new Date(date.getTime() - koreaTimeOffset * 60000);
  return koreaDate;
};

export default getKoreanTime;
