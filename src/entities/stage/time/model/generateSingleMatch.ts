import { MatchData, Team } from '@/shared/types/match';

const generateSingleMatch = (teams: Team[]): MatchData[] => {
  if (teams.length === 2) {
    return [
      {
        index: 1,
        teamAName: teams[0].teamName,
        teamBName: teams[1].teamName,
        round: '단판승부전',
      },
    ];
  }
  return [];
};

export default generateSingleMatch;
