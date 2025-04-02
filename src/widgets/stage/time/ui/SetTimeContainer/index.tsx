import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import LeagueMatchView from '@/entities/stage/time/ui/LeagueMatchView';
import SingleMatchView from '@/entities/stage/time/ui/SingleMatchView';
import TournamentMatchView from '@/entities/stage/time/ui/TournamentMatchView';
import { GameSystem } from '@/shared/types/stage/game';
import Input from '@/shared/ui/input';
import { useMatchStore } from '@/store/matchStore';

interface MatchData {
  index: number;
  teamAName: string;
  teamBName: string;
  round: string;
  startDate?: string;
  endDate?: string;
}

interface SavedMatchData {
  round: string;
  index: number;
  startDate: string;
  endDate: string;
  teamAName: string;
  teamBName: string;
}

interface TeamData {
  teamId: number;
  teamName: string;
}

interface SetTimeContainerProps {
  onMatchSave?: () => void;
  savedMatches: SavedMatchData[];
  system: GameSystem;
  matchId: number;
  teamIds: Record<string, number>;
}

const SetTimeContainer = ({
  onMatchSave,
  savedMatches: initialSavedMatches,
  system,
  matchId,
  teamIds,
}: SetTimeContainerProps) => {
  const { formatMatchData } = useMatchStore();
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedMatch, setSelectedMatch] = useState<{
    round: string;
    index: number;
  } | null>(null);
  const [savedMatches, setSavedMatches] = useState<SavedMatchData[]>(
    initialSavedMatches.filter(
      (match) => !(match.round === '결승' && match.index === 0),
    ),
  );
  const [matches, setMatches] = useState<{
    quarterFinals: MatchData[];
    semiFinals: MatchData[];
    finals: MatchData[];
  }>({
    quarterFinals: [],
    semiFinals: [],
    finals: [],
  });
  const [finalStage, setFinalStage] = useState<4 | 8>(8);

  const getSelectedMatchTeams = (
    round: string,
    index: number,
  ): { teamAName: string; teamBName: string } => {
    let match: MatchData | undefined;

    if (round === '8강') {
      match = matches.quarterFinals.find((m) => m.index === index);
    } else if (round === '4강') {
      match = matches.semiFinals.find((m) => m.index === index);
    } else if (round === '결승') {
      match = matches.finals.find((m) => m.index === index);
    } else if (round === '리그') {
      match = matches.finals.find((m) => m.index === index);
    } else if (round === '단판승부전') {
      match = matches.finals.find((m) => m.index === index);
    }

    return {
      teamAName: match?.teamAName || 'TBD',
      teamBName: match?.teamBName || 'TBD',
    };
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    if (selectedMatch && e.target.value && startTime && endTime) {
      const { teamAName, teamBName } = getSelectedMatchTeams(
        selectedMatch.round,
        selectedMatch.index,
      );
      saveMatchTime(
        selectedMatch.round,
        selectedMatch.index,
        e.target.value,
        startTime,
        endTime,
        teamAName,
        teamBName,
      );
    }
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
    if (selectedMatch && date && e.target.value && endTime) {
      const { teamAName, teamBName } = getSelectedMatchTeams(
        selectedMatch.round,
        selectedMatch.index,
      );
      saveMatchTime(
        selectedMatch.round,
        selectedMatch.index,
        date,
        e.target.value,
        endTime,
        teamAName,
        teamBName,
      );
    }
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
    if (selectedMatch && date && startTime && e.target.value) {
      const { teamAName, teamBName } = getSelectedMatchTeams(
        selectedMatch.round,
        selectedMatch.index,
      );
      saveMatchTime(
        selectedMatch.round,
        selectedMatch.index,
        date,
        startTime,
        e.target.value,
        teamAName,
        teamBName,
      );
    }
  };

  const saveMatchTime = (
    round: string,
    index: number,
    dateVal: string,
    startTimeVal: string,
    endTimeVal: string,
    teamAName: string,
    teamBName: string,
  ) => {
    try {
      // 한국 시간(UTC+9)으로 변환
      const startDateTime = new Date(`${dateVal}T${startTimeVal}`);
      const endDateTime = new Date(`${dateVal}T${endTimeVal}`);

      // 한국 시간으로 변환 (UTC+9)
      const koreaTimeOffset = 9 * 60; // 한국은 UTC+9
      const startDateStr = new Date(
        startDateTime.getTime() + koreaTimeOffset * 60000,
      ).toISOString();
      const endDateStr = new Date(
        endDateTime.getTime() + koreaTimeOffset * 60000,
      ).toISOString();

      const savedMatchesKey = `savedMatches_${matchId}`;
      let savedMatches: SavedMatchData[] = [];

      const existingData = sessionStorage.getItem(savedMatchesKey);
      if (existingData) {
        savedMatches = JSON.parse(existingData);
      }

      const matchIndex = savedMatches.findIndex(
        (match) => match.round === round && match.index === index,
      );

      if (matchIndex !== -1) {
        savedMatches[matchIndex] = {
          round,
          index,
          startDate: startDateStr,
          endDate: endDateStr,
          teamAName,
          teamBName,
        };
      } else {
        savedMatches.push({
          round,
          index,
          startDate: startDateStr,
          endDate: endDateStr,
          teamAName,
          teamBName,
        });
      }

      sessionStorage.setItem(savedMatchesKey, JSON.stringify(savedMatches));
      setSavedMatches(savedMatches);
      updateMatchDateInfo(round, index, startDateStr, endDateStr);

      toast.success('매치 시간이 저장되었습니다.');

      if (system === GameSystem.SINGLE) {
        if (onMatchSave) {
          onMatchSave();
        }
        return;
      }

      if (onMatchSave) {
        onMatchSave();
      }
    } catch (error) {
      toast.error('날짜 또는 시간 형식이 올바르지 않습니다.');
      console.error(error);
    }
  };

  const updateMatchDateInfo = (
    round: string,
    index: number,
    startDate: string,
    endDate: string,
  ) => {
    const newMatches = { ...matches };

    if (round === '8강') {
      const matchIndex = newMatches.quarterFinals.findIndex(
        (match) => match.index === index,
      );
      if (matchIndex !== -1) {
        newMatches.quarterFinals[matchIndex].startDate = startDate;
        newMatches.quarterFinals[matchIndex].endDate = endDate;
      }
    } else if (round === '4강') {
      const matchIndex = newMatches.semiFinals.findIndex(
        (match) => match.index === index,
      );
      if (matchIndex !== -1) {
        newMatches.semiFinals[matchIndex].startDate = startDate;
        newMatches.semiFinals[matchIndex].endDate = endDate;
      }
    } else if (round === '결승') {
      const matchIndex = newMatches.finals.findIndex(
        (match) => match.index === index,
      );
      if (matchIndex !== -1) {
        newMatches.finals[matchIndex].startDate = startDate;
        newMatches.finals[matchIndex].endDate = endDate;
      }
    }

    setMatches(newMatches);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMatchesKey = `savedMatches_${matchId}`;
      const savedMatchesData = sessionStorage.getItem(savedMatchesKey);

      if (savedMatchesData) {
        try {
          const parsedSavedMatches = JSON.parse(savedMatchesData);
          setMatches(parsedSavedMatches);
        } catch (error) {
          console.error(error);
        }
      }
    }
  }, [matchId]);

  useEffect(() => {
    if (typeof window !== 'undefined' && savedMatches.length > 0) {
      const savedMatchesKey = `savedMatches_${matchId}`;
      sessionStorage.setItem(savedMatchesKey, JSON.stringify(savedMatches));
      if (system === GameSystem.FULL_LEAGUE) {
        /* eslint-disable */
        const modifiedSavedMatches = savedMatches.map(({ round, ...rest }) => ({
          ...rest,
          leagueTurn: rest.index,
        }));
        sessionStorage.setItem(
          savedMatchesKey,
          JSON.stringify(modifiedSavedMatches),
        );
      } else if (system === GameSystem.TOURNAMENT) {
        const modifiedSavedMatches = savedMatches.filter(
          (match) => !(match.round === '결승' && match.index === 0),
        );

        sessionStorage.setItem(
          savedMatchesKey,
          JSON.stringify(modifiedSavedMatches),
        );
      }
      formatMatchData(matchId, savedMatches);
    }
  }, [savedMatches, matchId, formatMatchData]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const confirmedTeamsKey = `confirmedTeams_${matchId}`;
      const confirmedTeamsData = sessionStorage.getItem(confirmedTeamsKey);

      if (confirmedTeamsData) {
        try {
          const parsedTeams = JSON.parse(confirmedTeamsData);
          const teamCount = Array.isArray(parsedTeams) ? parsedTeams.length : 0;

          setFinalStage(teamCount < 5 ? 4 : 8);
        } catch (error) {
          toast.error('데이터 처리 오류');
          console.error(error);
        }
      } else {
        setFinalStage(8);
      }
    }
  }, [matchId]);

  useEffect(() => {
    try {
      if (system === GameSystem.FULL_LEAGUE) {
        const confirmedTeamsKey = `confirmedTeams_${matchId}`;
        const confirmedTeamsData = sessionStorage.getItem(confirmedTeamsKey);

        if (confirmedTeamsData) {
          const teams = JSON.parse(confirmedTeamsData);
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

          setMatches({
            quarterFinals: [],
            semiFinals: [],
            finals: leagueMatches,
          });
        }
        return;
      } else if (system === GameSystem.TOURNAMENT) {
        const placedTeamsKey = `placedTeams_${matchId}`;
        const placedTeamsData = sessionStorage.getItem(placedTeamsKey);

        const confirmedTeamsKey = `confirmedTeams_${matchId}`;
        const confirmedTeamsData = sessionStorage.getItem(confirmedTeamsKey);
        let allTeams: TeamData[] = [];
        let totalTeamCount = 0;

        if (confirmedTeamsData) {
          allTeams = JSON.parse(confirmedTeamsData) as TeamData[];
          totalTeamCount = allTeams.length;
        }

        const quarterFinals: MatchData[] = [];
        const semiFinals: MatchData[] = [];
        const finals: MatchData[] = [];

        if (placedTeamsData) {
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

          const leftTeamCount = Object.keys(
            teamsBySide[1]?.['left'] || {},
          ).length;
          const rightTeamCount = Object.keys(
            teamsBySide[1]?.['right'] || {},
          ).length;

          let leftActualMatches = Math.floor(leftTeamCount / 2);
          if (leftTeamCount % 2 === 1 && leftTeamCount > 1) {
            leftActualMatches += 1;
          }

          let rightActualMatches = Math.floor(rightTeamCount / 2);
          if (rightTeamCount % 2 === 1 && rightTeamCount > 1) {
            rightActualMatches += 1;
          }

          const totalTeams = leftTeamCount + rightTeamCount;

          if (totalTeams === 3) {
            const team1 = teamsBySide[1]?.['left']?.[0] || 'TBD';
            const team2 = teamsBySide[1]?.['left']?.[1] || 'TBD';
            const team4 = teamsBySide[1]?.['right']?.[0] || 'TBD';
            const team5 = teamsBySide[1]?.['right']?.[1] || 'TBD';

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
          }

          if (totalTeams === 4) {
            const finalTeamA = 'TBD';
            let finalTeamB = 'TBD';

            const confirmedTeamsKey = `confirmedTeams_${matchId}`;
            const confirmedTeamsData =
              sessionStorage.getItem(confirmedTeamsKey);

            finals.push({
              index: 1,
              teamAName: finalTeamA,
              teamBName: finalTeamB,
              round: '결승',
            });
          }

          if (finalStage === 8) {
            const leftTeamCount = Object.keys(
              teamsBySide[1]?.['left'] || {},
            ).length;
            const rightTeamCount = Object.keys(
              teamsBySide[1]?.['right'] || {},
            ).length;

            let leftActualMatches = Math.floor(leftTeamCount / 2);
            if (leftTeamCount % 2 === 1 && leftTeamCount > 1) {
              leftActualMatches += 1;
            }

            let rightActualMatches = Math.floor(rightTeamCount / 2);
            if (rightTeamCount % 2 === 1 && rightTeamCount > 1) {
              rightActualMatches += 1;
            }

            const byeTeams: Record<string, string> = {};

            const totalTeams = leftTeamCount + rightTeamCount;
            if (totalTeams === 5) {
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

              byeTeams['left_0'] = team3;
              byeTeams['right_0'] = team4;
            } else if (totalTeams === 6) {
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

              byeTeams['left_0'] = team3;
              byeTeams['right_0'] = team4;
            } else if (totalTeams === 7) {
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

              byeTeams['left_0'] = team3;
              byeTeams['right_0'] = team4;
            } else if (totalTeams === 8) {
              const team1 = teamsBySide[1]?.['left']?.[0] || 'TBD';
              const team2 = teamsBySide[1]?.['left']?.[1] || 'TBD';
              const team3 = teamsBySide[1]?.['left']?.[2] || 'TBD';
              const team4 = teamsBySide[1]?.['left']?.[3] || 'TBD';
              const team5 = teamsBySide[1]?.['right']?.[0] || 'TBD';
              const team6 = teamsBySide[1]?.['right']?.[1] || 'TBD';
              const team7 = teamsBySide[1]?.['right']?.[2] || 'TBD';
              const team8 = teamsBySide[1]?.['right']?.[3] || 'TBD';

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
                index: 3,
                teamAName: team7,
                teamBName: team8,
                round: '8강',
              });

              quarterFinals.push({
                index: 4,
                teamAName: team5,
                teamBName: team6,
                round: '8강',
              });

              finals.push({
                index: 1,
                teamAName: 'TBD',
                teamBName: 'TBD',
                round: '결승',
              });

              byeTeams['left_0'] = team3;
              byeTeams['right_0'] = team4;
            } else {
              finals.push({
                index: 1,
                teamAName: 'TBD',
                teamBName: 'TBD',
                round: '결승',
              });

              for (let i = 0; i < Math.ceil(rightTeamCount / 2); i++) {
                const teamAPos = i * 2;
                const teamBPos = i * 2 + 1;

                const hasBothTeams = teamBPos < rightTeamCount;

                const teamA = teamsBySide[1]?.['right']?.[teamAPos] || 'TBD';
                const teamB = hasBothTeams
                  ? teamsBySide[1]?.['right']?.[teamBPos] || 'TBD'
                  : '부전승';

                if (hasBothTeams || rightTeamCount === 1) {
                  quarterFinals.push({
                    index: quarterFinals.length + 1,
                    teamAName: teamA,
                    teamBName: teamB,
                    round: '8강',
                  });
                }

                if (!hasBothTeams && teamA !== 'TBD') {
                  const nextPosition = Math.floor(i / 2);
                  byeTeams[`right_${nextPosition}`] = teamA;
                }
              }
            }

            const totalQuarterFinalMatches = quarterFinals.length;

            const totalTeamCount = leftTeamCount + rightTeamCount;

            const shouldHaveTwoSemis = totalTeamCount >= 6;

            let totalSemiFinalMatches = Math.ceil(totalQuarterFinalMatches / 2);
            if (shouldHaveTwoSemis) {
              totalSemiFinalMatches = 2;
            }

            let leftSemiFinalMatches, rightSemiFinalMatches;

            if (totalSemiFinalMatches === 2) {
              leftSemiFinalMatches = Math.min(
                Math.max(1, leftTeamCount > 0 ? 1 : 0),
                1,
              );
              rightSemiFinalMatches = Math.min(
                Math.max(1, rightTeamCount > 0 ? 1 : 0),
                1,
              );
            } else {
              leftSemiFinalMatches = Math.min(
                Math.ceil(leftActualMatches / 2),
                1,
              );
              rightSemiFinalMatches = Math.min(
                Math.ceil(rightActualMatches / 2),
                Math.max(totalSemiFinalMatches - leftSemiFinalMatches, 0),
              );
            }
          } else {
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
                  } else if (positions.length % 2 === 1) {
                    const teamA = sides[side][positions[i]];

                    const nextRound = roundNum + 1;
                    const nextPosition = Math.floor(i / 2);
                    const nextPositionKey = `${nextRound}_${nextPosition}_${side}`;

                    const innerPlacedTeamsKey = `placedTeams_${matchId}`;
                    const innerPlacedTeamsData =
                      sessionStorage.getItem(innerPlacedTeamsKey);
                    let innerAllPlacedTeams: Record<string, string | TeamData> =
                      {};

                    if (innerPlacedTeamsData) {
                      innerAllPlacedTeams = JSON.parse(innerPlacedTeamsData);
                    }

                    if (teamA && teamA !== 'TBD') {
                      innerAllPlacedTeams[nextPositionKey] = teamA;
                      sessionStorage.setItem(
                        innerPlacedTeamsKey,
                        JSON.stringify(innerAllPlacedTeams),
                      );
                    }
                  }
                }
              });
            });
          }

          const sortAndAdjustIndexes = (matches: MatchData[]) => {
            matches.sort((a, b) => a.index - b.index);
            return matches;
          };

          const sortedQuarterFinals = sortAndAdjustIndexes([...quarterFinals]);
          const sortedSemiFinals = sortAndAdjustIndexes([...semiFinals]);
          setMatches({
            quarterFinals: sortedQuarterFinals,
            semiFinals: sortedSemiFinals,
            finals: finals,
          });
        } else {
          if (finalStage === 8) {
            setMatches({
              quarterFinals: [
                { index: 1, teamAName: 'TBD', teamBName: 'TBD', round: '8강' },
                { index: 2, teamAName: 'TBD', teamBName: 'TBD', round: '8강' },
                { index: 3, teamAName: 'TBD', teamBName: 'TBD', round: '8강' },
                { index: 4, teamAName: 'TBD', teamBName: 'TBD', round: '8강' },
              ],
              semiFinals: [
                { index: 1, teamAName: 'TBD', teamBName: 'TBD', round: '4강' },
                { index: 2, teamAName: 'TBD', teamBName: 'TBD', round: '4강' },
              ],
              finals: [
                { index: 1, teamAName: 'TBD', teamBName: 'TBD', round: '결승' },
              ],
            });
          } else {
            setMatches({
              quarterFinals: [],
              semiFinals: [
                { index: 1, teamAName: 'TBD', teamBName: 'TBD', round: '4강' },
                { index: 2, teamAName: 'TBD', teamBName: 'TBD', round: '4강' },
              ],
              finals: [
                { index: 1, teamAName: 'TBD', teamBName: 'TBD', round: '결승' },
              ],
            });
          }
        }
      } else if (system === GameSystem.SINGLE) {
        const confirmedTeamsKey = `confirmedTeams_${matchId}`;
        const confirmedTeamsData = sessionStorage.getItem(confirmedTeamsKey);

        if (confirmedTeamsData) {
          const teams = JSON.parse(confirmedTeamsData);
          if (teams.length === 2) {
            setMatches({
              quarterFinals: [],
              semiFinals: [],
              finals: [
                {
                  index: 1,
                  teamAName: teams[0].teamName,
                  teamBName: teams[1].teamName,
                  round: '단판승부전',
                },
              ],
            });
          }
        }
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }, [matchId, finalStage, system]);

  const handleMatchSelect = (round: string, index: number) => {
    if (
      selectedMatch &&
      selectedMatch.round === round &&
      selectedMatch.index === index
    ) {
      setSelectedMatch(null);
      setDate('');
      setStartTime('');
      setEndTime('');
    } else {
      setSelectedMatch({ round, index });

      const savedMatch = savedMatches.find(
        (match) => match.round === round && match.index === index,
      );

      if (savedMatch) {
        const startDate = new Date(savedMatch.startDate);
        const endDate = new Date(savedMatch.endDate);

        const koreaTimeOffset = 9 * 60;
        const koreaStartDate = new Date(
          startDate.getTime() - koreaTimeOffset * 60000,
        );
        const koreaEndDate = new Date(
          endDate.getTime() - koreaTimeOffset * 60000,
        );

        const formattedDate = koreaStartDate.toISOString().split('T')[0];
        const formattedStartTime = koreaStartDate
          .toTimeString()
          .split(' ')[0]
          .substring(0, 5);
        const formattedEndTime = koreaEndDate
          .toTimeString()
          .split(' ')[0]
          .substring(0, 5);

        setDate(formattedDate);
        setStartTime(formattedStartTime);
        setEndTime(formattedEndTime);
      } else {
        setDate('');
        setStartTime('');
        setEndTime('');
      }
    }
  };

  const isMatchSelected = (round: string, index: number): boolean => {
    return selectedMatch?.round === round && selectedMatch?.index === index;
  };

  const isMatchTimeSet = (round: string, index: number) => {
    if (system === GameSystem.FULL_LEAGUE) {
      return savedMatches.some((match) => match.index === index);
    }
    return savedMatches.some(
      (match) => match.round === round && match.index === index,
    );
  };

  const renderSections = () => {
    if (system === GameSystem.SINGLE) {
      return (
        <SingleMatchView
          matches={matches}
          teamIds={teamIds}
          finalStage={finalStage}
          matchId={matchId}
          handleMatchSelect={handleMatchSelect}
          isMatchSelected={isMatchSelected}
          isMatchTimeSet={isMatchTimeSet}
        />
      );
    } else if (system === GameSystem.FULL_LEAGUE) {
      return (
        <LeagueMatchView
          matches={matches}
          teamIds={teamIds}
          finalStage={finalStage}
          matchId={matchId}
          handleMatchSelect={handleMatchSelect}
          isMatchSelected={isMatchSelected}
          isMatchTimeSet={isMatchTimeSet}
        />
      );
    } else {
      return (
        <TournamentMatchView
          matches={matches}
          teamIds={teamIds}
          finalStage={finalStage}
          matchId={matchId}
          handleMatchSelect={handleMatchSelect}
          isMatchSelected={isMatchSelected}
          isMatchTimeSet={isMatchTimeSet}
        />
      );
    }
  };

  return (
    <div className="m-30 flex flex-col gap-8">
      <div className="my-20 min-h-[calc(50vh-120px)] rounded-lg bg-gray-700 p-8">
        <div
          className={`m-20 flex ${
            system === GameSystem.FULL_LEAGUE
              ? ''
              : finalStage === 4
                ? 'justify-center'
                : 'justify-between'
          } gap-4 p-20`}
        >
          {renderSections()}
        </div>
      </div>

      {selectedMatch && (
        <div className="flex gap-20">
          <div className="flex-1">
            <Input
              type="date"
              placeholder="날짜를 입력해주세요"
              value={date}
              onChange={handleDateChange}
              showBorder={true}
              onClick={(e) => {
                const input = e.target as HTMLInputElement;
                if (input.showPicker) {
                  input.showPicker();
                }
              }}
            />
          </div>
          <div className="flex-1">
            <Input
              type="time"
              placeholder="시작 시간을 입력해주세요"
              value={startTime}
              onChange={handleStartTimeChange}
              showBorder={true}
              onClick={(e) => {
                const input = e.target as HTMLInputElement;
                if (input.showPicker) {
                  input.showPicker();
                }
              }}
            />
          </div>
          <div className="flex-1">
            <Input
              type="time"
              placeholder="끝나는 시간을 입력해주세요"
              value={endTime}
              onChange={handleEndTimeChange}
              showBorder={true}
              onClick={(e) => {
                const input = e.target as HTMLInputElement;
                if (input.showPicker) {
                  input.showPicker();
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SetTimeContainer;
