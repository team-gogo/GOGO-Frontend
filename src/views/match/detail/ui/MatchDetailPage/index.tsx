'use client';

import { useEffect, useState } from 'react';
import { useMatchStore } from '@/shared/stores';
import { MatchData } from '@/shared/types/my/bet';
import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import {
  MatchDetailContainer,
  MatchPointContainer,
  MatchTeamFormation,
} from '@/widgets/match/detail';

interface MatchDetailPageProps {
  params: {
    matchId: string;
  };
}

const MatchDetailPage = ({ params }: MatchDetailPageProps) => {
  const { matchId } = params;

  const { match, setMatch } = useMatchStore();

  const [matchFromLocalStorage, setMatchFromLocalStorage] =
    useState<MatchData>();

  useEffect(() => {
    const storedMatch = localStorage.getItem('match');
    if (storedMatch) {
      const parsedMatch = JSON.parse(storedMatch);
      setMatchFromLocalStorage(parsedMatch);
      if (!match) {
        setMatch(parsedMatch);
      }
    }
  }, [match, setMatch]);

  const matchData = match || matchFromLocalStorage;

  if (!matchData) {
    return null;
  }

  const { ateam, bteam, category, betting } = matchData || {};

  return (
    <div
      className={cn(
        'flex',
        'w-full',
        'items-center',
        'justify-center',
        'py-[5rem]',
      )}
    >
      <div
        className={cn(
          'w-full',
          'max-w-[82.5rem]',
          'px-[1rem]',
          'flex',
          'flex-col',
          'gap-[5rem]',
        )}
      >
        <BackPageButton label={`${ateam.teamName} VS ${bteam.teamName}`} />
        <div
          className={cn(
            'flex',
            'w-full',
            'gap-[2.25rem]',
            'items-center',
            'flex-col',
          )}
        >
          <div
            className={cn('flex', 'flex-col', 'items-center', 'gap-[2.25rem]')}
          >
            <MatchDetailContainer matchId={matchId} category={category} />

            <MatchPointContainer
              ateam={ateam}
              bteam={bteam}
              betting={betting}
            />
          </div>
          <MatchTeamFormation ateam={ateam} bteam={bteam} category={category} />
        </div>
      </div>
    </div>
  );
};

export default MatchDetailPage;
