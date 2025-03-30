import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import MatchItem from '@/entities/stage/time/ui/MatchItem';
import Input from '@/shared/ui/input';

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

const SetTimeContainer = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [selectedMatch, setSelectedMatch] = useState<{
    round: string;
    index: number;
  } | null>(null);
  const [savedMatches, setSavedMatches] = useState<SavedMatchData[]>([]);
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

  const searchParams = useSearchParams();
  const matchId = parseInt(searchParams.get('matchId') || '0', 10);

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

  const getFormattedData = () => {
    const teamNameToIdMap = new Map<string, string>();

    try {
      const confirmedTeamsKey = `confirmedTeams_${matchId}`;
      const confirmedTeamsData = sessionStorage.getItem(confirmedTeamsKey);

      if (confirmedTeamsData) {
        const parsedTeams = JSON.parse(confirmedTeamsData);
        parsedTeams.forEach((team: { teamId: number; teamName: string }) => {
          teamNameToIdMap.set(team.teamName, team.teamId.toString());
        });
      }
    } catch (error) {
      console.error(error);
    }

    const tournamentGames = savedMatches.map((match) => {
      let round = '';

      if (match.round === '8강') {
        round = 'QUARTER_FINALS';
      } else if (match.round === '4강') {
        round = 'SEMI_FINALS';
      } else if (match.round === '결승') {
        round = 'FINALS';
      }

      const teamAId = teamNameToIdMap.get(match.teamAName) || 'TBD';
      const teamBId = teamNameToIdMap.get(match.teamBName) || 'TBD';

      return {
        teamAId: teamAId,
        teamBId: teamBId,
        round,
        turn: match.index,
        startDate: match.startDate,
        endDate: match.endDate,
      };
    });

    return tournamentGames;
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

      if (existingMatchIndex !== -1) {
        const updatedSavedMatches = [...savedMatches];
        updatedSavedMatches[existingMatchIndex] = newSavedMatch;
        setSavedMatches(updatedSavedMatches);
      } else {
        setSavedMatches([...savedMatches, newSavedMatch]);
      }

      updateMatchDateInfo(round, index, startDateStr, endDateStr);

      console.log(getFormattedData());
      toast.success('매치 시간이 저장되었습니다.');
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
          setSavedMatches(parsedSavedMatches);
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
    }
  }, [savedMatches, matchId]);

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
      const placedTeamsKey = `placedTeams_${matchId}`;
      const placedTeamsData = sessionStorage.getItem(placedTeamsKey);

      if (placedTeamsData) {
        const placedTeams: Record<string, string> = JSON.parse(placedTeamsData);

        const teamsBySide: Record<
          number,
          Record<string, Record<number, string>>
        > = {};

        Object.entries(placedTeams).forEach(([positionKey, teamName]) => {
          const [round, position, side] = positionKey.split('_');
          const roundNum = Number(round);
          const positionNum = Number(position);

          if (!teamsBySide[roundNum]) {
            teamsBySide[roundNum] = { left: {}, right: {} };
          }

          teamsBySide[roundNum][side][positionNum] = teamName || 'TBD';
        });

        const quarterFinals: MatchData[] = [];
        const semiFinals: MatchData[] = [];
        const finals: MatchData[] = [];

        const finalRound = finalStage === 4 ? 2 : 3;
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
            finalTeamB = teamsBySide[finalRound]['right'][rightPositions[0]];
          }

          if (finalTeamA || finalTeamB) {
            finals.push({
              index: 1,
              teamAName: finalTeamA || 'TBD',
              teamBName: finalTeamB || 'TBD',
              round: '결승',
            });
          }
        }

        Object.entries(teamsBySide).forEach(([roundStr, sides]) => {
          const roundNum = Number(roundStr);
          if (
            (finalStage === 4 && roundNum === 2) ||
            (finalStage === 8 && roundNum === 3)
          ) {
            return;
          }

          let roundName: string;
          if (finalStage === 4) {
            roundName = roundNum === 1 ? '4강' : '결승';
          } else {
            roundName =
              roundNum === 1 ? '8강' : roundNum === 2 ? '4강' : '결승';
          }

          ['left', 'right'].forEach((side) => {
            const positions = Object.keys(sides[side])
              .map(Number)
              .sort((a, b) => a - b);

            for (let i = 0; i < positions.length; i += 2) {
              if (i + 1 < positions.length) {
                const teamA = sides[side][positions[i]];
                const teamB = sides[side][positions[i + 1]];

                const match: MatchData = {
                  index: Math.floor(i / 2) + 1,
                  teamAName: teamA,
                  teamBName: teamB,
                  round: roundName,
                };

                if (finalStage === 4) {
                  if (roundNum === 1) {
                    semiFinals.push(match);
                  }
                } else {
                  if (roundNum === 1) {
                    quarterFinals.push(match);
                  } else if (roundNum === 2) {
                    semiFinals.push(match);
                  }
                }
              } else if (positions.length % 2 === 1) {
                const teamA = sides[side][positions[i]];

                const match: MatchData = {
                  index: Math.floor(i / 2) + 1,
                  teamAName: teamA,
                  teamBName: 'TBD',
                  round: roundName,
                };

                if (finalStage === 4) {
                  if (roundNum === 1) {
                    semiFinals.push(match);
                  }
                } else {
                  if (roundNum === 1) {
                    quarterFinals.push(match);
                  } else if (roundNum === 2) {
                    semiFinals.push(match);
                  }
                }
              }
            }
          });
        });

        const sortAndAdjustIndexes = (matches: MatchData[]) => {
          matches.sort((a, b) => {
            if (a.teamAName.includes('left') && !b.teamAName.includes('left'))
              return -1;
            if (!a.teamAName.includes('left') && b.teamAName.includes('left'))
              return 1;
            return a.index - b.index;
          });

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
        setMatches({
          quarterFinals: [],
          semiFinals: [],
          finals: [],
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [matchId, finalStage]);

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

  const isMatchSelected = (round: string, index: number) => {
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
                    match.teamBName === 'TBD') ||
                  (finalStage === 4 &&
                    match.round === '4강' &&
                    match.teamBName === 'TBD')
                ),
            )
            .map((match) => (
              <div key={`${match.round}-${match.index}`} className="relative">
                <MatchItem
                  index={match.index}
                  teamAName={match.teamAName}
                  teamBName={match.teamBName}
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
    if (finalStage === 4) {
      return (
        <>
          <div className="flex w-1/2 flex-col gap-20 rounded-lg border border-gray-500 bg-gray-700 p-6">
            <h2 className="text-center text-h4s text-white">4강</h2>
            <div className="flex flex-col items-center gap-10">
              {matches.semiFinals.length > 0 ? (
                matches.semiFinals
                  .filter(
                    (match) =>
                      !(match.round === '4강' && match.teamBName === 'TBD'),
                  )
                  .map((match) => (
                    <div
                      key={`${match.round}-${match.index}`}
                      className="relative"
                    >
                      <MatchItem
                        index={match.index}
                        teamAName={match.teamAName}
                        teamBName={match.teamBName}
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
              {matches.finals.length > 0 ? (
                matches.finals.map((match) => (
                  <div
                    key={`${match.round}-${match.index}`}
                    className="relative"
                  >
                    <MatchItem
                      index={match.index}
                      teamAName={match.teamAName}
                      teamBName={match.teamBName}
                      selected={isMatchSelected(match.round, match.index)}
                      solved={!isMatchTimeSet(match.round, match.index)}
                      onClick={() =>
                        handleMatchSelect(match.round, match.index)
                      }
                    />
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400">경기 없음</div>
              )}
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
          className={`m-20 flex ${finalStage === 4 ? 'justify-center' : 'justify-between'} gap-4 p-20`}
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
            />
          </div>
          <div className="flex-1">
            <Input
              type="time"
              placeholder="시간을 입력해주세요"
              value={time}
              onChange={handleTimeChange}
              showBorder={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SetTimeContainer;
