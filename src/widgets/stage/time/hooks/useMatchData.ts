import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MatchData } from '@/shared/types/match';
import { GameSystem } from '@/shared/types/stage/game';

interface TeamData {
  teamId: number;
  teamName: string;
}

interface UseMatchDataProps {
  matchId: number;
  system: GameSystem;
  finalStage: 4 | 8;
}

interface MatchState {
  quarterFinals: MatchData[];
  semiFinals: MatchData[];
  finals: MatchData[];
}

export const useMatchData = ({
  matchId,
  system,
  finalStage,
}: UseMatchDataProps) => {
  const [matches, setMatches] = useState<MatchState>({
    quarterFinals: [],
    semiFinals: [],
    finals: [],
  });

  const initializeLeagueMatches = (teams: TeamData[]) => {
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

  const initializeSingleMatch = (teams: TeamData[]) => {
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

  const initializeTournamentMatches = (
    placedTeams: Record<string, TeamData | string>,
    teamsBySide: Record<number, Record<string, Record<number, string>>>,
  ) => {
    const quarterFinals: MatchData[] = [];
    const semiFinals: MatchData[] = [];
    const finals: MatchData[] = [];

    const leftTeamCount = Object.keys(teamsBySide[1]?.['left'] || {}).length;
    const rightTeamCount = Object.keys(teamsBySide[1]?.['right'] || {}).length;
    const _totalTeams = leftTeamCount + rightTeamCount;

    if (_totalTeams === 3) {
      const team1 = teamsBySide[1]?.['left']?.[0] || 'TBD';
      const team2 = teamsBySide[1]?.['left']?.[1] || 'TBD';
      const team4 = teamsBySide[1]?.['right']?.[0] || 'TBD';

      semiFinals.push({
        index: 1,
        teamAName: team1,
        teamBName: team2,
        round: '4강',
      });

      finals.push({
        index: 1,
        teamAName: 'TBD',
        teamBName: team4,
        round: '결승',
      });
    } else if (_totalTeams === 4) {
      finals.push({
        index: 1,
        teamAName: 'TBD',
        teamBName: 'TBD',
        round: '결승',
      });
    } else if (finalStage === 8) {
      if (_totalTeams === 5) {
        const team1 = teamsBySide[1]?.['left']?.[0] || 'TBD';
        const team2 = teamsBySide[1]?.['left']?.[1] || 'TBD';
        const team3 = teamsBySide[1]?.['left']?.[2] || 'TBD';
        const team4 = teamsBySide[1]?.['right']?.[0] || 'TBD';
        const team5 = teamsBySide[1]?.['right']?.[1] || 'TBD';

        quarterFinals.push({
          index: 1,
          teamAName: team1,
          teamBName: team2,
          round: '8강',
        });

        semiFinals.push({
          index: 1,
          teamAName: team4,
          teamBName: team5,
          round: '4강',
        });

        semiFinals.push({
          index: 2,
          teamAName: 'TBD',
          teamBName: team3,
          round: '4강',
        });

        finals.push({
          index: 1,
          teamAName: 'TBD',
          teamBName: 'TBD',
          round: '결승',
        });
      } else if (_totalTeams === 6) {
        const team1 = teamsBySide[1]?.['left']?.[0] || 'TBD';
        const team2 = teamsBySide[1]?.['left']?.[1] || 'TBD';
        const team3 = teamsBySide[1]?.['left']?.[2] || 'TBD';
        const team4 = teamsBySide[1]?.['right']?.[0] || 'TBD';
        const team5 = teamsBySide[1]?.['right']?.[1] || 'TBD';
        const team6 = teamsBySide[1]?.['right']?.[2] || 'TBD';

        quarterFinals.push({
          index: 1,
          teamAName: team1,
          teamBName: team2,
          round: '8강',
        });

        quarterFinals.push({
          index: 3,
          teamAName: team5,
          teamBName: team6,
          round: '8강',
        });

        semiFinals.push({
          index: 1,
          teamAName: 'TBD',
          teamBName: team3,
          round: '4강',
        });

        semiFinals.push({
          index: 2,
          teamAName: 'TBD',
          teamBName: team4,
          round: '4강',
        });

        finals.push({
          index: 1,
          teamAName: 'TBD',
          teamBName: 'TBD',
          round: '결승',
        });
      } else if (_totalTeams === 7) {
        const team1 = teamsBySide[1]?.['left']?.[0] || 'TBD';
        const team2 = teamsBySide[1]?.['left']?.[1] || 'TBD';
        const team3 = teamsBySide[1]?.['left']?.[2] || 'TBD';
        const team4 = teamsBySide[1]?.['left']?.[3] || 'TBD';
        const team5 = teamsBySide[1]?.['right']?.[0] || 'TBD';
        const team6 = teamsBySide[1]?.['right']?.[1] || 'TBD';
        const team7 = teamsBySide[1]?.['right']?.[2] || 'TBD';

        quarterFinals.push({
          index: 1,
          teamAName: team1,
          teamBName: team2,
          round: '8강',
        });

        quarterFinals.push({
          index: 2,
          teamAName: team3,
          teamBName: team4,
          round: '8강',
        });

        quarterFinals.push({
          index: 4,
          teamAName: team5,
          teamBName: team6,
          round: '8강',
        });

        semiFinals.push({
          index: 1,
          teamAName: 'TBD',
          teamBName: 'TBD',
          round: '4강',
        });

        semiFinals.push({
          index: 2,
          teamAName: 'TBD',
          teamBName: team7,
          round: '4강',
        });

        finals.push({
          index: 1,
          teamAName: 'TBD',
          teamBName: 'TBD',
          round: '결승',
        });
      } else if (_totalTeams === 8) {
        const team1 = teamsBySide[1]?.['left']?.[0] || 'TBD';
        const team2 = teamsBySide[1]?.['left']?.[1] || 'TBD';
        const team3 = teamsBySide[1]?.['left']?.[2] || 'TBD';
        const team4 = teamsBySide[1]?.['left']?.[3] || 'TBD';
        const team5 = teamsBySide[1]?.['right']?.[0] || 'TBD';
        const team6 = teamsBySide[1]?.['right']?.[1] || 'TBD';
        const team7 = teamsBySide[1]?.['right']?.[2] || 'TBD';
        const team8 = teamsBySide[1]?.['right']?.[3] || 'TBD';

        quarterFinals.push(
          {
            index: 1,
            teamAName: team1,
            teamBName: team2,
            round: '8강',
          },
          {
            index: 2,
            teamAName: team3,
            teamBName: team4,
            round: '8강',
          },
          {
            index: 3,
            teamAName: team7,
            teamBName: team8,
            round: '8강',
          },
          {
            index: 4,
            teamAName: team5,
            teamBName: team6,
            round: '8강',
          },
        );

        finals.push({
          index: 1,
          teamAName: 'TBD',
          teamBName: 'TBD',
          round: '결승',
        });
      }
    }

    const sortAndAdjustIndexes = (matches: MatchData[]) => {
      return [...matches].sort((a, b) => a.index - b.index);
    };

    return {
      quarterFinals: sortAndAdjustIndexes(quarterFinals),
      semiFinals: sortAndAdjustIndexes(semiFinals),
      finals,
    };
  };

  useEffect(() => {
    try {
      if (system === GameSystem.FULL_LEAGUE) {
        const confirmedTeamsData = sessionStorage.getItem(
          `confirmedTeams_${matchId}`,
        );
        if (confirmedTeamsData) {
          const teams = JSON.parse(confirmedTeamsData) as TeamData[];
          const leagueMatches = initializeLeagueMatches(teams);
          setMatches({
            quarterFinals: [],
            semiFinals: [],
            finals: leagueMatches,
          });
        }
      } else if (system === GameSystem.SINGLE) {
        const confirmedTeamsData = sessionStorage.getItem(
          `confirmedTeams_${matchId}`,
        );
        if (confirmedTeamsData) {
          const teams = JSON.parse(confirmedTeamsData) as TeamData[];
          const singleMatch = initializeSingleMatch(teams);
          setMatches({
            quarterFinals: [],
            semiFinals: [],
            finals: singleMatch,
          });
        }
      } else if (system === GameSystem.TOURNAMENT) {
        const placedTeamsData = sessionStorage.getItem(
          `placedTeams_${matchId}`,
        );
        const confirmedTeamsData = sessionStorage.getItem(
          `confirmedTeams_${matchId}`,
        );

        if (placedTeamsData && confirmedTeamsData) {
          const placedTeams = JSON.parse(placedTeamsData) as Record<
            string,
            TeamData | string
          >;
          const teamsBySide: Record<
            number,
            Record<string, Record<number, string>>
          > = {};

          Object.entries(placedTeams).forEach(([positionKey, teamData]) => {
            const [round, position, side] = positionKey.split('_');
            const roundNum = Number(round);
            const positionNum = Number(position);

            if (!teamsBySide[roundNum]) {
              teamsBySide[roundNum] = { left: {}, right: {} };
            }

            if (
              teamData &&
              typeof teamData === 'object' &&
              'teamName' in teamData
            ) {
              teamsBySide[roundNum][side][positionNum] = teamData.teamName;
            } else if (
              teamData &&
              typeof teamData === 'string' &&
              teamData !== 'TBD'
            ) {
              teamsBySide[roundNum][side][positionNum] = teamData;
            }
          });

          const tournamentMatches = initializeTournamentMatches(
            placedTeams,
            teamsBySide,
          );
          setMatches(tournamentMatches);
        } else {
          setMatches(
            finalStage === 8
              ? {
                  quarterFinals: [
                    {
                      index: 1,
                      teamAName: 'TBD',
                      teamBName: 'TBD',
                      round: '8강',
                    },
                    {
                      index: 2,
                      teamAName: 'TBD',
                      teamBName: 'TBD',
                      round: '8강',
                    },
                    {
                      index: 3,
                      teamAName: 'TBD',
                      teamBName: 'TBD',
                      round: '8강',
                    },
                    {
                      index: 4,
                      teamAName: 'TBD',
                      teamBName: 'TBD',
                      round: '8강',
                    },
                  ],
                  semiFinals: [
                    {
                      index: 1,
                      teamAName: 'TBD',
                      teamBName: 'TBD',
                      round: '4강',
                    },
                    {
                      index: 2,
                      teamAName: 'TBD',
                      teamBName: 'TBD',
                      round: '4강',
                    },
                  ],
                  finals: [
                    {
                      index: 1,
                      teamAName: 'TBD',
                      teamBName: 'TBD',
                      round: '결승',
                    },
                  ],
                }
              : {
                  quarterFinals: [],
                  semiFinals: [
                    {
                      index: 1,
                      teamAName: 'TBD',
                      teamBName: 'TBD',
                      round: '4강',
                    },
                    {
                      index: 2,
                      teamAName: 'TBD',
                      teamBName: 'TBD',
                      round: '4강',
                    },
                  ],
                  finals: [
                    {
                      index: 1,
                      teamAName: 'TBD',
                      teamBName: 'TBD',
                      round: '결승',
                    },
                  ],
                },
          );
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('매치 데이터 처리 중 오류가 발생했습니다.');
    }
  }, [matchId, system, finalStage]);

  return {
    matches,
    setMatches,
  };
};
