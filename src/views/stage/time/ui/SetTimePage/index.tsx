'use client';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import BackPageButton from '@/shared/ui/backPageButton';
import Button from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';
import SetTimeContainer from '@/widgets/stage/time/ui/SetTimeContainer';

const MATCH_CHECK_INTERVAL = 1000;

const SetTimePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const matchId = searchParams.get('matchId');
  const [allMatchesScheduled, setAllMatchesScheduled] = useState(true);

  const checkMatchesScheduled = useCallback(() => {
    if (typeof window !== 'undefined' && matchId) {
      const savedMatchesKey = `savedMatches_${matchId}`;
      const savedMatchesData = sessionStorage.getItem(savedMatchesKey);
      const placedTeamsKey = `placedTeams_${matchId}`;
      const placedTeamsData = sessionStorage.getItem(placedTeamsKey);

      if (!savedMatchesData || !placedTeamsData) {
        setAllMatchesScheduled(false);
        return;
      }

      try {
        const savedMatches = JSON.parse(savedMatchesData);
        const placedTeams = Object.entries(JSON.parse(placedTeamsData)).filter(
          ([_, value]) => value !== 'TBD' && value !== '',
        );

        let validMatchCount = 0;
        let savedMatchCount = 0;

        const teamCount = placedTeams.length;
        const finalStage = teamCount < 10 ? 4 : 8;

        if (finalStage === 4) {
          const semiFinalsMatchKeys = placedTeams
            .filter(([key]) => key.startsWith('1_'))
            .map(([key]) => key.split('_'));

          const semiFinalsPositions: Record<string, number> = {};
          semiFinalsMatchKeys.forEach(([_, pos, side]) => {
            const posKey = `${side}_${Math.floor(Number(pos) / 2)}`;
            semiFinalsPositions[posKey] =
              (semiFinalsPositions[posKey] || 0) + 1;
          });

          validMatchCount += Object.values(semiFinalsPositions).filter(
            (count) => count === 2,
          ).length;

          validMatchCount += 1;
        } else {
          const quarterFinalsMatchKeys = placedTeams
            .filter(([key]) => key.startsWith('1_'))
            .map(([key]) => key.split('_'));

          const semiFinalsMatchKeys = placedTeams
            .filter(([key]) => key.startsWith('2_'))
            .map(([key]) => key.split('_'));

          const quarterFinalsPositions: Record<string, number> = {};
          quarterFinalsMatchKeys.forEach(([_, pos, side]) => {
            const posKey = `${side}_${Math.floor(Number(pos) / 2)}`;
            quarterFinalsPositions[posKey] =
              (quarterFinalsPositions[posKey] || 0) + 1;
          });

          validMatchCount += Object.values(quarterFinalsPositions).filter(
            (count) => count === 2,
          ).length;

          const semiFinalsPositions: Record<string, number> = {};
          semiFinalsMatchKeys.forEach(([_, pos, side]) => {
            const posKey = `${side}_${Math.floor(Number(pos) / 2)}`;
            semiFinalsPositions[posKey] =
              (semiFinalsPositions[posKey] || 0) + 1;
          });

          validMatchCount += Object.values(semiFinalsPositions).filter(
            (count) => count === 2,
          ).length;

          validMatchCount += 1;
        }

        savedMatchCount = savedMatches.length;

        setAllMatchesScheduled(savedMatchCount >= validMatchCount);
      } catch (error) {
        console.error(error);
        setAllMatchesScheduled(false);
      }
    }
  }, [matchId]);

  useEffect(() => {
    checkMatchesScheduled();

    const intervalId = setInterval(checkMatchesScheduled, MATCH_CHECK_INTERVAL);

    window.addEventListener('focus', checkMatchesScheduled);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `savedMatches_${matchId}`) {
        checkMatchesScheduled();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('focus', checkMatchesScheduled);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [checkMatchesScheduled, matchId]);

  const handleConfirm = () => {
    if (matchId) {
      sessionStorage.setItem(`isConfirmed_${matchId}`, 'true');
      setTimeout(() => {
        router.push(`/stage`);
      }, 100);
    } else {
      router.push(`/stage`);
    }
  };

  const handleMatchSave = useCallback(() => {
    checkMatchesScheduled();
  }, [checkMatchesScheduled]);

  return (
    <div className={cn('flex', 'justify-center', 'w-full')}>
      <div
        className={cn(
          'w-full',
          'max-w-[1320px]',
          'flex',
          'flex-col',
          'mt-28',
          'align-middle',
          'justify-center',
          'relative',
          'pb-28',
        )}
      >
        <div className={cn('m-30')}>
          <BackPageButton type="back" label="팀들 날짜와 시간 설정하기" />
        </div>

        <div id="match-container">
          <SetTimeContainer onMatchSave={handleMatchSave} />
        </div>

        <div
          className={cn(
            'fixed',
            'bottom-0',
            'left-0',
            'right-0',
            'p-30',
            'bg-[#1F1F1F]',
            'z-10',
            'flex',
            'justify-center',
          )}
        >
          <div className={cn('max-w-[1320px]', 'w-full', 'px-24')}>
            <Button
              onClick={handleConfirm}
              disabled={!allMatchesScheduled}
              className={
                !allMatchesScheduled ? 'cursor-not-allowed opacity-50' : ''
              }
            >
              {!allMatchesScheduled ? '모든 매치 시간을 설정해주세요' : '확인'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetTimePage;
