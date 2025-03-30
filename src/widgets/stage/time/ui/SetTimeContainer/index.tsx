import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import MatchItem from '@/entities/stage/time/ui/MatchItem';
import Input from '@/shared/ui/input';

interface MatchData {
  index: number;
  teamA: string;
  teamB: string;
  round: string;
}

const SetTimeContainer = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [selectedMatch, setSelectedMatch] = useState<{
    round: string;
    index: number;
  } | null>(null);
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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

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
              teamA: finalTeamA || 'TBD',
              teamB: finalTeamB || 'TBD',
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
                  teamA,
                  teamB,
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
                  teamA,
                  teamB: 'TBD',
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
            if (a.teamA.includes('left') && !b.teamA.includes('left'))
              return -1;
            if (!a.teamA.includes('left') && b.teamA.includes('left')) return 1;
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
    } else {
      setSelectedMatch({ round, index });
    }
  };

  const isMatchSelected = (round: string, index: number) => {
    return selectedMatch?.round === round && selectedMatch?.index === index;
  };

  const renderMatchSection = (title: string, matchList: MatchData[]) => (
    <div className="flex w-1/3 flex-col gap-20 rounded-lg border border-gray-500 bg-gray-700 p-6">
      <h2 className="text-center text-h4s text-white">{title}</h2>
      <div className="flex flex-col items-center gap-10">
        {matchList.length > 0 ? (
          matchList.map((match) => (
            <MatchItem
              key={`${match.round}-${match.index}`}
              index={match.index}
              teamA={match.teamA}
              teamB={match.teamB}
              selected={isMatchSelected(match.round, match.index)}
              onClick={() => handleMatchSelect(match.round, match.index)}
            />
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
                matches.semiFinals.map((match) => (
                  <MatchItem
                    key={`${match.round}-${match.index}`}
                    index={match.index}
                    teamA={match.teamA}
                    teamB={match.teamB}
                    selected={isMatchSelected(match.round, match.index)}
                    onClick={() => handleMatchSelect(match.round, match.index)}
                  />
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
                  <MatchItem
                    key={`${match.round}-${match.index}`}
                    index={match.index}
                    teamA={match.teamA}
                    teamB={match.teamB}
                    selected={isMatchSelected(match.round, match.index)}
                    onClick={() => handleMatchSelect(match.round, match.index)}
                  />
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

      <form onSubmit={handleSubmit} className="flex gap-20">
        <div className="flex-1">
          <Input
            placeholder="날짜를 입력해주세요"
            value={date}
            onChange={handleDateChange}
            showBorder={true}
          />
        </div>
        <div className="flex-1">
          <Input
            placeholder="시간을 입력해주세요"
            value={time}
            onChange={handleTimeChange}
            showBorder={true}
          />
        </div>
      </form>
    </div>
  );
};

export default SetTimeContainer;
