export const getTournamentMatches = (finalStage: 4 | 8) => {
  if (finalStage === 8) {
    return {
      quarterFinals: Array(4)
        .fill(null)
        .map((_, i) => ({
          index: i + 1,
          teamAName: 'TBD',
          teamBName: 'TBD',
          round: '8강',
        })),
      semiFinals: Array(2)
        .fill(null)
        .map((_, i) => ({
          index: i + 1,
          teamAName: 'TBD',
          teamBName: 'TBD',
          round: '4강',
        })),
      finals: [
        {
          index: 1,
          teamAName: 'TBD',
          teamBName: 'TBD',
          round: '결승',
        },
      ],
    };
  }

  return {
    quarterFinals: [],
    semiFinals: Array(2)
      .fill(null)
      .map((_, i) => ({
        index: i + 1,
        teamAName: 'TBD',
        teamBName: 'TBD',
        round: '4강',
      })),
    finals: [
      {
        index: 1,
        teamAName: 'TBD',
        teamBName: 'TBD',
        round: '결승',
      },
    ],
  };
};
