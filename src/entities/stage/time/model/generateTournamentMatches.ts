import { MatchData, Team } from '@/shared/types/match';

const generateTournamentMatches = (
  placedTeams: Record<string, Team | string>,
  totalTeamCount: number,
  finalStage: 4 | 8,
) => {
  const teamsBySide: Record<
    number,
    Record<string, Record<number, string>>
  > = {};
  const quarterFinals: MatchData[] = [];
  const semiFinals: MatchData[] = [];
  const finals: MatchData[] = [];

  Object.entries(placedTeams).forEach(([positionKey, teamData]) => {
    const [round, position, side] = positionKey.split('_');
    const roundNum = Number(round);
    const positionNum = Number(position);

    if (!teamsBySide[roundNum]) {
      teamsBySide[roundNum] = { left: {}, right: {} };
    }

    if (teamData && typeof teamData === 'object' && 'teamName' in teamData) {
      teamsBySide[roundNum][side][positionNum] = teamData.teamName;
    } else if (teamData && typeof teamData === 'string' && teamData !== 'TBD') {
      teamsBySide[roundNum][side][positionNum] = teamData;
    }
  });

  const leftTeamCount = Object.keys(teamsBySide[1]?.['left'] || {}).length;
  const rightTeamCount = Object.keys(teamsBySide[1]?.['right'] || {}).length;
  const totalTeams = leftTeamCount + rightTeamCount;

  if (finalStage === 8) {
    if (totalTeams === 5) {
      const [team1, team2, team3] = Array(3)
        .fill(0)
        .map((_, i) => teamsBySide[1]?.['left']?.[i] || 'TBD');
      const [team4, team5] = Array(2)
        .fill(0)
        .map((_, i) => teamsBySide[1]?.['right']?.[i] || 'TBD');

      quarterFinals.push({
        index: 1,
        teamAName: team1,
        teamBName: team2,
        round: '8강',
      });
      semiFinals.push(
        { index: 1, teamAName: team4, teamBName: team5, round: '4강' },
        { index: 2, teamAName: 'TBD', teamBName: team3, round: '4강' },
      );
    } else if (totalTeams === 6) {
      const [team1, team2, team3] = Array(3)
        .fill(0)
        .map((_, i) => teamsBySide[1]?.['left']?.[i] || 'TBD');
      const [team4, team5, team6] = Array(3)
        .fill(0)
        .map((_, i) => teamsBySide[1]?.['right']?.[i] || 'TBD');

      quarterFinals.push(
        { index: 1, teamAName: team1, teamBName: team2, round: '8강' },
        { index: 3, teamAName: team5, teamBName: team6, round: '8강' },
      );
      semiFinals.push(
        { index: 1, teamAName: 'TBD', teamBName: team3, round: '4강' },
        { index: 2, teamAName: 'TBD', teamBName: team4, round: '4강' },
      );
    } else if (totalTeams === 7) {
      const [team1, team2, team3, team4] = Array(4)
        .fill(0)
        .map((_, i) => teamsBySide[1]?.['left']?.[i] || 'TBD');
      const [team5, team6, team7] = Array(3)
        .fill(0)
        .map((_, i) => teamsBySide[1]?.['right']?.[i] || 'TBD');

      quarterFinals.push(
        { index: 1, teamAName: team1, teamBName: team2, round: '8강' },
        { index: 2, teamAName: team3, teamBName: team4, round: '8강' },
        { index: 4, teamAName: team5, teamBName: team6, round: '8강' },
      );
      semiFinals.push(
        { index: 1, teamAName: 'TBD', teamBName: 'TBD', round: '4강' },
        { index: 2, teamAName: team7, teamBName: 'TBD', round: '4강' },
      );
    } else if (totalTeams === 8) {
      const [team1, team2, team3, team4] = Array(4)
        .fill(0)
        .map((_, i) => teamsBySide[1]?.['left']?.[i] || 'TBD');
      const [team5, team6, team7, team8] = Array(4)
        .fill(0)
        .map((_, i) => teamsBySide[1]?.['right']?.[i] || 'TBD');

      quarterFinals.push(
        { index: 1, teamAName: team1, teamBName: team2, round: '8강' },
        { index: 2, teamAName: team3, teamBName: team4, round: '8강' },
        { index: 3, teamAName: team7, teamBName: team8, round: '8강' },
        { index: 4, teamAName: team5, teamBName: team6, round: '8강' },
      );
    }
  } else if (finalStage === 4) {
    Object.entries(teamsBySide).forEach(([roundStr, sides]) => {
      const roundNum = Number(roundStr);
      if (roundNum === 2) return;

      const roundName = roundNum === 1 ? '4강' : '결승';

      ['left', 'right'].forEach((side) => {
        const positions = Object.keys(sides[side])
          .map(Number)
          .sort((a, b) => a - b);

        for (let i = 0; i < positions.length; i += 2) {
          if (i + 1 < positions.length) {
            const teamA = sides[side][positions[i]];
            const teamB = sides[side][positions[i + 1]];

            semiFinals.push({
              index: Math.floor(i / 2) + 1 + (side === 'right' ? 1 : 0),
              teamAName: teamA,
              teamBName: teamB,
              round: roundName,
            });
          }
        }
      });
    });
  }

  finals.push({
    index: 1,
    teamAName: 'TBD',
    teamBName: 'TBD',
    round: '결승',
  });

  return {
    quarterFinals: quarterFinals.sort((a, b) => a.index - b.index),
    semiFinals: semiFinals.sort((a, b) => a.index - b.index),
    finals,
  };
};

export default generateTournamentMatches;
