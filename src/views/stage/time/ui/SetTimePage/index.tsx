'use client';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import BackPageButton from '@/shared/ui/backPageButton';
import Button from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';
import { getMatchApplyList } from '@/views/stage/apply/api/getMatchApplyList';
import { getStageList } from '@/views/stage/ui/api/getStageList';
import SetTimeContainer from '@/widgets/stage/time/ui/SetTimeContainer';

const MATCH_CHECK_INTERVAL = 1000;

const SetTimePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const gameId = searchParams.get('gameId');

  const [stageId, setStageId] = useState<number | null>(null);
  const [allMatchesScheduled, setAllMatchesScheduled] = useState(true);

  const checkMatchesScheduled = useCallback(() => {
    if (typeof window !== 'undefined' && gameId) {
      const savedMatchesKey = `savedMatches_${gameId}`;
      const savedMatchesData = sessionStorage.getItem(savedMatchesKey);
      const placedTeamsKey = `placedTeams_${gameId}`;
      const placedTeamsData = sessionStorage.getItem(placedTeamsKey);

      if (!savedMatchesData || !placedTeamsData) {
        setAllMatchesScheduled(false);
        return;
      }

      try {
        const savedMatches = JSON.parse(savedMatchesData);
        const parsedPlacedTeamsData = JSON.parse(placedTeamsData);

        const byeMatchKeys = Object.entries(parsedPlacedTeamsData)
          .filter(([key, value]) => {
            const teamData = value as { teamId: number; teamName: string };
            const hasTeam =
              teamData &&
              teamData.teamName !== '' &&
              teamData.teamName !== 'TBD';
            if (!hasTeam) return false;

            const [round, position, side] = key.split('_');
            const roundNum = Number(round);
            const positionNum = Number(position);

            const neighborPosition =
              positionNum % 2 === 0 ? positionNum + 1 : positionNum - 1;
            const neighborKey = `${roundNum}_${neighborPosition}_${side}`;

            const neighborTeam = parsedPlacedTeamsData[neighborKey];
            return (
              !neighborTeam ||
              !neighborTeam.teamName ||
              neighborTeam.teamName === 'TBD'
            );
          })
          .map(([key]) => key);

        const placedTeams = Object.entries(parsedPlacedTeamsData).filter(
          ([key, value]) => {
            const teamData = value as { teamId: number; teamName: string };
            return (
              teamData &&
              teamData.teamName !== '' &&
              teamData.teamName !== 'TBD' &&
              !byeMatchKeys.includes(key)
            );
          },
        );

        let validMatchCount = 0;
        let savedMatchCount = 0;

        const teamCount = Object.keys(parsedPlacedTeamsData).length;
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
  }, [gameId]);

  useEffect(() => {
    checkMatchesScheduled();

    const intervalId = setInterval(checkMatchesScheduled, MATCH_CHECK_INTERVAL);

    window.addEventListener('focus', checkMatchesScheduled);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `savedMatches_${gameId}`) {
        checkMatchesScheduled();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('focus', checkMatchesScheduled);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [checkMatchesScheduled, gameId]);

  useEffect(() => {
    const fetchStageId = async () => {
      if (gameId) {
        try {
          const stageResponse = await getStageList();

          if (
            stageResponse &&
            stageResponse.stages &&
            stageResponse.stages.length > 0
          ) {
            for (const stage of stageResponse.stages) {
              try {
                const gamesResponse = await getMatchApplyList(stage.stageId);

                if (gamesResponse && gamesResponse.games) {
                  const foundGame = gamesResponse.games.find(
                    (game) => game.gameId === parseInt(gameId),
                  );

                  if (foundGame) {
                    setStageId(stage.stageId);
                    sessionStorage.setItem(
                      `gameStageId_${gameId}`,
                      String(stage.stageId),
                    );
                    break;
                  }
                }
              } catch (error) {
                console.error('스테이지 게임 정보 가져오기 실패:', error);
              }
            }
          }
        } catch (error) {
          console.error('스테이지 목록 가져오기 실패:', error);
        }
      }
    };

    if (gameId) {
      const savedStageId = sessionStorage.getItem(`gameStageId_${gameId}`);
      if (savedStageId) {
        setStageId(parseInt(savedStageId));
      } else {
        fetchStageId();
      }
    }
  }, [gameId]);

  const handleConfirm = () => {
    if (gameId) {
      sessionStorage.setItem(`isConfirmed_${gameId}`, 'true');
      setTimeout(() => {
        if (stageId) {
          router.push(`/stage/stageId=${stageId}`);
        } else {
          router.push(`/stage`);
        }
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
          <BackPageButton
            type="back"
            label="팀들 날짜와 시간 설정하기"
            onClick={() => {
              sessionStorage.removeItem(`placedTeams_${gameId}`);
              router.back();
              setTimeout(() => {
                window.location.reload();
              }, 100);
            }}
          />
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
