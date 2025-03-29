import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
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
  const [matches, setMatches] = useState<{
    quarterFinals: MatchData[];
    semiFinals: MatchData[];
    finals: MatchData[];
  }>({
    quarterFinals: [],
    semiFinals: [],
    finals: [],
  });

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
      sessionStorage.getItem(confirmedTeamsKey);
    }
  }, [matchId]);

  useEffect(() => {
    try {
      const placedTeamsKey = `placedTeams_${matchId}`;
      const placedTeamsData = sessionStorage.getItem(placedTeamsKey);

      if (placedTeamsData) {
        const placedTeams: Record<string, string> = JSON.parse(placedTeamsData);

        const quarterFinals: MatchData[] = [];
        const semiFinals: MatchData[] = [];
        const finals: MatchData[] = [];

        Object.entries(placedTeams).forEach(([positionKey, teamName]) => {
          const [round, position, side] = positionKey.split('_');
          const roundNum = Number(round);
          const positionNum = Number(position);

          const opposingSide = side === 'left' ? 'right' : 'left';
          const opposingKey = `${round}_${position}_${opposingSide}`;
          const opposingTeam = placedTeams[opposingKey] || 'TBD';

          if (side === 'right') return;

          const match: MatchData = {
            index: positionNum + 1,
            teamA: teamName,
            teamB: opposingTeam,
            round: roundNum === 1 ? '8강' : roundNum === 2 ? '4강' : '결승',
          };

          if (roundNum === 1) {
            quarterFinals.push(match);
          } else if (roundNum === 2) {
            semiFinals.push(match);
          } else if (roundNum === 3 || roundNum === 4) {
            finals.push(match);
          }
        });
        quarterFinals.sort((a, b) => a.index - b.index);
        semiFinals.sort((a, b) => a.index - b.index);
        finals.sort((a, b) => a.index - b.index);

        setMatches({
          quarterFinals,
          semiFinals,
          finals,
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
  }, [matchId]);

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
            />
          ))
        ) : (
          <div className="text-center text-gray-400">경기 없음</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="m-30 flex flex-col gap-8">
      <div className="my-20 rounded-lg bg-gray-700 p-8">
        <div className="m-20 flex justify-between gap-4 p-20">
          {renderMatchSection('8강', matches.quarterFinals)}
          {renderMatchSection('4강', matches.semiFinals)}
          {renderMatchSection('결승', matches.finals)}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-20">
        <div className="flex-1">
          <Input
            placeholder="날짜 입력해주세요"
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
