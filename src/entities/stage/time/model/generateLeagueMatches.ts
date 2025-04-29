import { MatchData, Team } from '@/shared/types/match';

const generateLeagueMatches = (teams: Team[]): MatchData[] => {
  const n = teams.length;
  const leagueMatches: MatchData[] = [];

  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      leagueMatches.push({
        index: leagueMatches.length + 1,
        teamAName: teams[i].teamName,
        teamBName: teams[j].teamName,
        round: '리그',
      });
    }
  }

  return leagueMatches;
};

export default generateLeagueMatches;
