import { MatchesState } from '../types/match';

export const getTournamentMatches = (finalStage: 4 | 8): MatchesState => {
  const matches: MatchesState = {
    quarterFinals: [],
    semiFinals: [],
    finals: [],
  };

  if (finalStage === 8) {
    for (let i = 0; i < 4; i++) {
      matches.quarterFinals.push({
        index: i,
        round: '8강',
        teamAName: 'TBD',
        teamBName: 'TBD',
      });
    }
  }

  for (let i = 0; i < 2; i++) {
    matches.semiFinals.push({
      index: i,
      round: '4강',
      teamAName: 'TBD',
      teamBName: 'TBD',
    });
  }

  matches.finals.push({
    index: 0,
    round: '결승',
    teamAName: 'TBD',
    teamBName: 'TBD',
  });

  return matches;
};
