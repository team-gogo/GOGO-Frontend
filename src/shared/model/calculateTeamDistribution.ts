interface GroupDistribution {
  top: number;
  bottom: number;
}

const calculateTeamDistribution = (
  totalTeamCount: number,
): [GroupDistribution, GroupDistribution] => {
  if (totalTeamCount === 6) {
    return [
      { top: 2, bottom: 1 },
      { top: 1, bottom: 2 },
    ];
  }

  if (totalTeamCount <= 4) {
    const leftTotal = Math.ceil(totalTeamCount / 2);
    const rightTotal = Math.floor(totalTeamCount / 2);
    return [
      { top: leftTotal, bottom: 0 },
      { top: rightTotal, bottom: 0 },
    ];
  }

  const leftTotal = Math.ceil(totalTeamCount / 2);
  const rightTotal = Math.floor(totalTeamCount / 2);

  return [
    {
      top: Math.ceil(leftTotal / 2),
      bottom: Math.floor(leftTotal / 2),
    },
    {
      top: Math.ceil(rightTotal / 2),
      bottom: Math.floor(rightTotal / 2),
    },
  ];
};

export default calculateTeamDistribution;
