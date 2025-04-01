import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import MatchItem from '@/entities/stage/time/ui/MatchItem';
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
  const [time, setTime] = useState('');
  const [selectedMatch, setSelectedMatch] = useState<{
    round: string;
    index: number;
  } | null>(null);
  const [savedMatches, setSavedMatches] =
    useState<SavedMatchData[]>(initialSavedMatches);
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
    if (selectedMatch && e.target.value && time) {
      const { teamAName, teamBName } = getSelectedMatchTeams(
        selectedMatch.round,
        selectedMatch.index,
      );
      saveMatchTime(
        selectedMatch.round,
        selectedMatch.index,
        teamAName,
        teamBName,
        e.target.value,
        time,
      );
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
    if (selectedMatch && date && e.target.value) {
      const { teamAName, teamBName } = getSelectedMatchTeams(
        selectedMatch.round,
        selectedMatch.index,
      );
      saveMatchTime(
        selectedMatch.round,
        selectedMatch.index,
        teamAName,
        teamBName,
        date,
        e.target.value,
      );
    }
  };

  const saveMatchTime = (
    round: string,
    index: number,
    teamAName: string,
    teamBName: string,
    dateVal: string,
    timeVal: string,
  ) => {
    try {
      const startDateTime = new Date(`${dateVal}T${timeVal}`);
      const endDateTime = new Date(startDateTime);
      endDateTime.setHours(endDateTime.getHours() + 2);

      const startDateStr = startDateTime.toISOString();
      const endDateStr = endDateTime.toISOString();

      const newSavedMatch: SavedMatchData = {
        round: round,
        index: index,
        startDate: startDateStr,
        endDate: endDateStr,
        teamAName: teamAName,
        teamBName: teamBName,
      };

      const existingMatchIndex = savedMatches.findIndex(
        (match) => match.round === round && match.index === index,
      );

      const updatedSavedMatches = [...savedMatches];
      if (existingMatchIndex !== -1) {
        updatedSavedMatches[existingMatchIndex] = newSavedMatch;
      } else {
        updatedSavedMatches.push(newSavedMatch);
      }

      setSavedMatches(updatedSavedMatches);
      sessionStorage.setItem(
        `savedMatches_${matchId}`,
        JSON.stringify(updatedSavedMatches),
      );

      updateMatchDateInfo(round, index, startDateStr, endDateStr);

      toast.success('매치 시간이 저장되었습니다.');

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

        if (totalTeamCount === 3 && finalStage === 4) {
          const semiFinals: MatchData[] = [];
          const finals: MatchData[] = [];

          if (placedTeamsData) {
            const placedTeams = JSON.parse(placedTeamsData) as Record<
              string,
              TeamData | string
            >;
            const seededTeamsIn4Round: string[] = [];
            const seededTeamPositions: {
              teamName: string;
              position: string;
            }[] = [];

            Object.entries(placedTeams).forEach(([positionKey, teamData]) => {
              const [round, position, side] = positionKey.split('_');
              if (Number(round) === 1) {
                let teamName = '';
                if (
                  teamData &&
                  typeof teamData === 'object' &&
                  'teamName' in teamData
                ) {
                  teamName = teamData.teamName;
                  if (teamName && teamName !== 'TBD') {
                    seededTeamsIn4Round.push(teamName);
                    seededTeamPositions.push({
                      teamName,
                      position: `${position}_${side}`,
                    });
                  }
                } else if (
                  teamData &&
                  typeof teamData === 'string' &&
                  teamData !== 'TBD'
                ) {
                  teamName = teamData;
                  if (teamName) {
                    seededTeamsIn4Round.push(teamName);
                    seededTeamPositions.push({
                      teamName,
                      position: `${position}_${side}`,
                    });
                  }
                }
              }
            });

            const allTeamNames = allTeams.map((team) => team.teamName);
            const byeTeam = allTeamNames.find(
              (teamName) => !seededTeamsIn4Round.includes(teamName),
            );

            if (seededTeamPositions.length <= 2) {
              if (seededTeamPositions.length === 2) {
                semiFinals.push({
                  index: 1,
                  teamAName: seededTeamPositions[0].teamName,
                  teamBName: seededTeamPositions[1].teamName,
                  round: '4강',
                });
              } else if (seededTeamPositions.length === 1) {
                semiFinals.push({
                  index: 1,
                  teamAName: seededTeamPositions[0].teamName,
                  teamBName: 'TBD',
                  round: '4강',
                });
              } else {
                semiFinals.push({
                  index: 1,
                  teamAName: 'TBD',
                  teamBName: 'TBD',
                  round: '4강',
                });
              }

              finals.push({
                index: 1,
                teamAName: 'TBD',
                teamBName: byeTeam || 'TBD',
                round: '결승',
              });

              setMatches({
                quarterFinals: [],
                semiFinals,
                finals,
              });
              return;
            }
          } else {
            semiFinals.push({
              index: 1,
              teamAName: 'TBD',
              teamBName: 'TBD',
              round: '4강',
            });

            finals.push({
              index: 1,
              teamAName: 'TBD',
              teamBName: 'TBD',
              round: '결승',
            });

            setMatches({
              quarterFinals: [],
              semiFinals,
              finals,
            });
            return;
          }
        }

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

          const quarterFinals: MatchData[] = [];
          const semiFinals: MatchData[] = [];
          const finals: MatchData[] = [];

          if (finalStage === 4) {
            const finalTeamA = 'TBD';
            let finalTeamB = 'TBD';

            const confirmedTeamsKey = `confirmedTeams_${matchId}`;
            const confirmedTeamsData =
              sessionStorage.getItem(confirmedTeamsKey);

            if (confirmedTeamsData) {
              const teams = JSON.parse(confirmedTeamsData) as TeamData[];
              if (teams.length === 3) {
                const seededTeams: string[] = [];

                Object.entries(placedTeams).forEach(
                  ([positionKey, teamData]) => {
                    const [round, _position, _side] = positionKey.split('_');
                    const roundNum = Number(round);

                    if (roundNum === 1) {
                      if (
                        typeof teamData === 'object' &&
                        'teamName' in teamData
                      ) {
                        seededTeams.push(teamData.teamName);
                      } else if (
                        typeof teamData === 'string' &&
                        teamData !== 'TBD'
                      ) {
                        seededTeams.push(teamData);
                      }
                    }
                  },
                );

                const allTeamNames = teams.map(
                  (team: TeamData) => team.teamName,
                );
                const byeTeam = allTeamNames.find(
                  (teamName: string) => !seededTeams.includes(teamName),
                );

                if (byeTeam) {
                  finalTeamB = byeTeam;
                }
              }
            }

            finals.push({
              index: 1,
              teamAName: finalTeamA,
              teamBName: finalTeamB,
              round: '결승',
            });
          } else {
            const finalRound = 3;
            let finalTeamA: string | undefined;
            let finalTeamB: string | undefined;

            if (teamsBySide[finalRound]) {
              const leftPositions = Object.keys(
                teamsBySide[finalRound]['left'],
              ).map(Number);
              if (leftPositions.length > 0) {
                finalTeamA = teamsBySide[finalRound]['left'][leftPositions[0]];
              }

              const rightPositions = Object.keys(
                teamsBySide[finalRound]['right'],
              ).map(Number);
              if (rightPositions.length > 0) {
                finalTeamB =
                  teamsBySide[finalRound]['right'][rightPositions[0]];
              }
            }

            finals.push({
              index: 1,
              teamAName: finalTeamA || 'TBD',
              teamBName: finalTeamB || 'TBD',
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

            for (let i = 0; i < Math.ceil(leftTeamCount / 2); i++) {
              const teamAPos = i * 2;
              const teamBPos = i * 2 + 1;

              const hasBothTeams = teamBPos < leftTeamCount;

              const teamA = teamsBySide[1]?.['left']?.[teamAPos] || 'TBD';
              const teamB = hasBothTeams
                ? teamsBySide[1]?.['left']?.[teamBPos] || 'TBD'
                : '부전승';

              if (hasBothTeams || leftTeamCount === 1) {
                quarterFinals.push({
                  index: quarterFinals.length + 1,
                  teamAName: teamA,
                  teamBName: teamB,
                  round: '8강',
                });
              }

              if (!hasBothTeams && teamA !== 'TBD') {
                const nextPosition = Math.floor(i / 2);
                byeTeams[`left_${nextPosition}`] = teamA;
              }
            }

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

            for (let i = 0; i < leftSemiFinalMatches; i++) {
              const teamA =
                teamsBySide[2]?.['left']?.[i] || byeTeams[`left_${i}`] || 'TBD';
              let teamB = teamsBySide[2]?.['left']?.[i + 1] || 'TBD';

              if (byeTeams[`left_${i + 1}`]) {
                teamB = byeTeams[`left_${i + 1}`];
              }

              semiFinals.push({
                index: i + 1,
                teamAName: teamA,
                teamBName: teamB,
                round: '4강',
              });
            }

            for (let i = 0; i < rightSemiFinalMatches; i++) {
              const teamA =
                teamsBySide[2]?.['right']?.[i] ||
                byeTeams[`right_${i}`] ||
                'TBD';
              let teamB = teamsBySide[2]?.['right']?.[i + 1] || 'TBD';

              if (byeTeams[`right_${i + 1}`]) {
                teamB = byeTeams[`right_${i + 1}`];
              }

              semiFinals.push({
                index: leftSemiFinalMatches + i + 1,
                teamAName: teamA,
                teamBName: teamB,
                round: '4강',
              });
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
            matches.forEach((match, idx) => {
              match.index = idx + 1;
            });
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
      setTime('');
    } else {
      setSelectedMatch({ round, index });

      const savedMatch = savedMatches.find(
        (match) => match.round === round && match.index === index,
      );

      if (savedMatch) {
        const startDate = new Date(savedMatch.startDate);
        const formattedDate = startDate.toISOString().split('T')[0];
        const formattedTime = startDate
          .toTimeString()
          .split(' ')[0]
          .substring(0, 5);

        setDate(formattedDate);
        setTime(formattedTime);
      } else {
        setDate('');
        setTime('');
      }
    }
  };

  const isMatchSelected = (round: string, index: number): boolean => {
    return selectedMatch?.round === round && selectedMatch?.index === index;
  };

  const isMatchTimeSet = (round: string, index: number) => {
    return savedMatches.some(
      (match) => match.round === round && match.index === index,
    );
  };

  const renderMatchSection = (title: string, matchList: MatchData[]) => (
    <div className="flex w-1/3 flex-col gap-20 rounded-lg border border-gray-500 bg-gray-700 p-6">
      <h2 className="text-center text-h4s text-white">{title}</h2>
      <div className="flex flex-col items-center gap-10">
        {matchList.length > 0 ? (
          matchList
            .filter(
              (match) =>
                !(
                  (finalStage === 8 &&
                    match.round === '8강' &&
                    match.teamBName === 'TBD' &&
                    match.teamAName === 'TBD') ||
                  (finalStage === 4 &&
                    match.round === '4강' &&
                    match.teamBName === 'TBD' &&
                    match.teamAName === 'TBD')
                ),
            )
            .map((match) => (
              <div key={`${match.round}-${match.index}`} className="relative">
                <MatchItem
                  index={match.index}
                  teamAName={match.teamAName}
                  teamBName={
                    match.teamBName === '부전승'
                      ? `${match.teamAName}(부전승)`
                      : match.teamBName
                  }
                  teamAId={teamIds[match.teamAName]}
                  teamBId={teamIds[match.teamBName]}
                  selected={isMatchSelected(match.round, match.index)}
                  solved={!isMatchTimeSet(match.round, match.index)}
                  onClick={() => handleMatchSelect(match.round, match.index)}
                />
              </div>
            ))
        ) : (
          <div className="text-center text-gray-400">경기 없음</div>
        )}
      </div>
    </div>
  );

  const renderSections = () => {
    if (system === GameSystem.SINGLE) {
      return (
        <div className="flex w-full flex-col gap-20 rounded-lg border border-gray-500 bg-gray-700 p-6">
          <h2 className="text-center text-h4s text-white">단판승부전</h2>
          <div className="flex flex-col items-center gap-10">
            {matches.finals.length > 0 ? (
              matches.finals.map((match) => (
                <div key={`${match.round}-${match.index}`} className="relative">
                  <MatchItem
                    index={match.index}
                    teamAName={match.teamAName}
                    teamBName={match.teamBName}
                    teamAId={teamIds[match.teamAName]}
                    teamBId={teamIds[match.teamBName]}
                    selected={isMatchSelected('단판승부전', match.index)}
                    solved={!isMatchTimeSet('단판승부전', match.index)}
                    onClick={() => handleMatchSelect('단판승부전', match.index)}
                  />
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400">경기 없음</div>
            )}
          </div>
        </div>
      );
    } else if (system === GameSystem.FULL_LEAGUE) {
      return (
        <div className="flex w-full flex-col gap-20 rounded-lg border border-gray-500 bg-gray-700 p-6">
          <h2 className="text-center text-h4s text-white">리그</h2>
          <div className="grid grid-cols-3 gap-10">
            {matches.finals.length > 0 ? (
              matches.finals.map((match) => (
                <div key={`${match.round}-${match.index}`} className="relative">
                  <MatchItem
                    index={match.index}
                    teamAName={match.teamAName}
                    teamBName={match.teamBName}
                    teamAId={teamIds[match.teamAName]}
                    teamBId={teamIds[match.teamBName]}
                    selected={isMatchSelected(match.round, match.index)}
                    solved={!isMatchTimeSet(match.round, match.index)}
                    onClick={() => handleMatchSelect(match.round, match.index)}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-400">
                경기 없음
              </div>
            )}
          </div>
        </div>
      );
    } else if (finalStage === 4) {
      const confirmedTeamsKey = `confirmedTeams_${matchId}`;
      const confirmedTeamsData = sessionStorage.getItem(confirmedTeamsKey);

      if (confirmedTeamsData && system === GameSystem.TOURNAMENT) {
        const teams = JSON.parse(confirmedTeamsData) as TeamData[];
        if (teams.length === 3) {
          const byeTeamData = sessionStorage.getItem(`threeTeamBye_${matchId}`);
          let byeTeamName = 'TBD';

          if (byeTeamData) {
            try {
              const byeTeam = JSON.parse(byeTeamData) as TeamData;
              byeTeamName = byeTeam.teamName;
            } catch (error) {
              console.error(error);
            }
          } else {
            const placedTeamsKey = `placedTeams_${matchId}`;
            const placedTeamsData = sessionStorage.getItem(placedTeamsKey);

            if (placedTeamsData) {
              const placedTeams = JSON.parse(placedTeamsData) as Record<
                string,
                TeamData | string
              >;
              const seededTeams: string[] = [];

              Object.entries(placedTeams).forEach(([positionKey, teamData]) => {
                const [round, _pos, _side] = positionKey.split('_');
                if (Number(round) === 1) {
                  if (
                    teamData &&
                    typeof teamData === 'object' &&
                    'teamName' in teamData &&
                    teamData.teamName &&
                    teamData.teamName !== 'TBD'
                  ) {
                    seededTeams.push(teamData.teamName);
                  } else if (
                    teamData &&
                    typeof teamData === 'string' &&
                    teamData !== 'TBD'
                  ) {
                    seededTeams.push(teamData);
                  }
                }
              });

              const allTeamNames = teams.map((team) => team.teamName);
              const byeTeam = allTeamNames.find(
                (teamName) => !seededTeams.includes(teamName),
              );
              if (byeTeam) {
                byeTeamName = byeTeam;
              }
            }
          }

          const semiFinalTeams: string[] = [];
          if (matches.semiFinals.length > 0) {
            const match = matches.semiFinals[0];
            if (match.teamAName && match.teamAName !== 'TBD')
              semiFinalTeams.push(match.teamAName);
            if (match.teamBName && match.teamBName !== 'TBD')
              semiFinalTeams.push(match.teamBName);
          }

          return (
            <>
              <div className="flex w-1/2 flex-col gap-20 rounded-lg border border-gray-500 bg-gray-700 p-6">
                <h2 className="text-center text-h4s text-white">4강</h2>
                <div className="flex flex-col items-center gap-10">
                  <div className="relative">
                    <MatchItem
                      index={1}
                      teamAName={semiFinalTeams[0] || 'TBD'}
                      teamBName={semiFinalTeams[1] || 'TBD'}
                      teamAId={teamIds[semiFinalTeams[0] || 'TBD']}
                      teamBId={teamIds[semiFinalTeams[1] || 'TBD']}
                      selected={isMatchSelected('4강', 1)}
                      solved={!isMatchTimeSet('4강', 1)}
                      onClick={() => handleMatchSelect('4강', 1)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex w-1/2 flex-col gap-20 rounded-lg border border-gray-500 bg-gray-700 p-6">
                <h2 className="text-center text-h4s text-white">결승</h2>
                <div className="flex flex-col items-center gap-10">
                  <div className="relative">
                    <MatchItem
                      index={1}
                      teamAName="TBD"
                      teamBName={byeTeamName}
                      teamAId={teamIds['TBD']}
                      teamBId={teamIds[byeTeamName]}
                      selected={isMatchSelected('결승', 1)}
                      solved={!isMatchTimeSet('결승', 1)}
                      onClick={() => handleMatchSelect('결승', 1)}
                    />
                  </div>
                </div>
              </div>
            </>
          );
        }
      }

      return (
        <>
          <div className="flex w-1/2 flex-col gap-20 rounded-lg border border-gray-500 bg-gray-700 p-6">
            <h2 className="text-center text-h4s text-white">4강</h2>
            <div className="flex flex-col items-center gap-10">
              {matches.semiFinals.length > 0 ? (
                matches.semiFinals
                  .filter(
                    (match) =>
                      !(match.teamAName === 'TBD' && match.teamBName === 'TBD'),
                  )
                  .map((match) => (
                    <div
                      key={`${match.round}-${match.index}`}
                      className="relative"
                    >
                      <MatchItem
                        index={match.index}
                        teamAName={match.teamAName}
                        teamBName={
                          match.teamBName === '부전승'
                            ? `${match.teamAName}(부전승)`
                            : match.teamBName
                        }
                        teamAId={teamIds[match.teamAName]}
                        teamBId={teamIds[match.teamBName]}
                        selected={isMatchSelected(match.round, match.index)}
                        onClick={() =>
                          handleMatchSelect(match.round, match.index)
                        }
                        solved={!isMatchTimeSet(match.round, match.index)}
                      />
                    </div>
                  ))
              ) : (
                <div className="text-center text-gray-400">경기 없음</div>
              )}
            </div>
          </div>

          <div className="flex w-1/2 flex-col gap-20 rounded-lg border border-gray-500 bg-gray-700 p-6">
            <h2 className="text-center text-h4s text-white">결승</h2>
            <div className="flex flex-col items-center gap-10">
              {matches.finals.map((match) => (
                <div key={`${match.round}-${match.index}`} className="relative">
                  <MatchItem
                    index={match.index}
                    teamAName={match.teamAName}
                    teamBName={
                      match.teamBName === '부전승'
                        ? `${match.teamAName}(부전승)`
                        : match.teamBName
                    }
                    teamAId={teamIds[match.teamAName]}
                    teamBId={teamIds[match.teamBName]}
                    selected={isMatchSelected(match.round, match.index)}
                    solved={!isMatchTimeSet(match.round, match.index)}
                    onClick={() => handleMatchSelect(match.round, match.index)}
                  />
                </div>
              ))}
              {matches.finals.length === 0 ? (
                <div className="text-center text-gray-400">경기 없음</div>
              ) : null}
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          {renderMatchSection('8강', matches.quarterFinals)}
          {renderMatchSection('4강', matches.semiFinals)}
          {renderMatchSection('결승', matches.finals)}
        </>
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
              placeholder="시간을 입력해주세요"
              value={time}
              onChange={handleTimeChange}
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
