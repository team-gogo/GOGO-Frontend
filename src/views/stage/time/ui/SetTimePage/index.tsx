'use client';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { postStage } from '@/entities/stage/api/postStage';
import BackPageButton from '@/shared/ui/backPageButton';
import Button from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';
import { getMatchApplyList } from '@/views/stage/apply/api/getMatchApplyList';
import { getStageList } from '@/views/stage/ui/api/getStageList';
import SetTimeContainer from '@/widgets/stage/time/ui/SetTimeContainer';

const MATCH_CHECK_INTERVAL = 1000;

interface MatchSchedule {
  startDate: string;
  endDate: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  [key: string]: any;
}

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

      if (!savedMatchesData) {
        setAllMatchesScheduled(false);
        return;
      }

      try {
        const savedMatches = JSON.parse(savedMatchesData) as MatchSchedule[];

        const allScheduled = savedMatches.every(
          (match) => match.startDate && match.endDate,
        );

        setAllMatchesScheduled(allScheduled);
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
                    console.log(foundGame);
                    setStageId(stage.stageId);
                    sessionStorage.setItem(
                      `gameStageId_${foundGame.gameId}`,
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

  const handleConfirm = async (gameId: number) => {
    if (gameId) {
      sessionStorage.setItem(`isConfirmed_${gameId}`, 'true');

      if (allMatchesScheduled && stageId) {
        try {
          let stageGames = [];
          try {
            const response = await getMatchApplyList(stageId);
            stageGames = response.games || [];
          } catch (error) {
            toast.error('스테이지 게임 정보를 가져오는데 실패했습니다.');
            return;
          }

          const systemTypes = stageGames.map((game) =>
            game.system.toLowerCase(),
          );
          const uniqueSystems = Array.from(new Set(systemTypes));

          if (uniqueSystems.length === 0) {
            toast.error('스테이지에 등록된 게임 시스템이 없습니다.');
            return;
          }

          const confirmedGamesArray: {
            gameId: number;
            single?: {
              teamAId: number;
              teamBId: number;
              startDate: string;
              endDate: string;
            };
            tournament?: Array<{
              teamAId?: number;
              teamBId?: number;
              round:
                | 'ROUND_OF_32'
                | 'ROUND_OF_16'
                | 'QUARTER_FINALS'
                | 'SEMI_FINALS'
                | 'FINALS';
              turn: number;
              startDate: string;
              endDate: string;
            }>;
            fullLeague?: Array<{
              teamAId: number;
              teamBId: number;
              leagueTurn: number;
              startDate: string;
              endDate: string;
            }>;
          }[] = [];

          for (const game of stageGames) {
            try {
              console.log(game);
              const gameId = game.gameId;
              const system = game.system.toLowerCase();
              const confirmedTeamsData = sessionStorage.getItem(
                `confirmedTeams_${gameId}`,
              );
              const savedMatchesData = sessionStorage.getItem(
                `savedMatches_${gameId}`,
              );

              if (confirmedTeamsData && savedMatchesData) {
                const teams = JSON.parse(confirmedTeamsData);
                const savedMatches = JSON.parse(savedMatchesData);

                if (teams.length >= 2 && savedMatches.length > 0) {
                  const gameObj: {
                    gameId: number;
                    single?: {
                      teamAId: number;
                      teamBId: number;
                      startDate: string;
                      endDate: string;
                    };
                    tournament?: Array<{
                      teamAId?: number;
                      teamBId?: number;
                      round:
                        | 'ROUND_OF_32'
                        | 'ROUND_OF_16'
                        | 'QUARTER_FINALS'
                        | 'SEMI_FINALS'
                        | 'FINALS';
                      turn: number;
                      startDate: string;
                      endDate: string;
                    }>;
                    fullLeague?: Array<{
                      teamAId: number;
                      teamBId: number;
                      leagueTurn: number;
                      startDate: string;
                      endDate: string;
                    }>;
                  } = { gameId };

                  if (system === 'single') {
                    const match = savedMatches[0];
                    gameObj.single = {
                      teamAId: teams[0]?.teamId || 1,
                      teamBId: teams[1]?.teamId || 2,
                      startDate: match.startDate || new Date().toISOString(),
                      endDate:
                        match.endDate ||
                        new Date(Date.now() + 3600000).toISOString(),
                    };
                  } else if (system === 'tournament') {
                    const teamNameToIdMap = new Map();
                    teams.forEach(
                      (team: { teamId: number; teamName: string }) => {
                        teamNameToIdMap.set(team.teamName, team.teamId);
                      },
                    );

                    const tournamentGames = savedMatches.map(
                      (match: {
                        round?: string;
                        index?: number;
                        teamAName: string;
                        teamBName: string;
                        startDate?: string;
                        endDate?: string;
                      }) => {
                        let round:
                          | 'ROUND_OF_32'
                          | 'ROUND_OF_16'
                          | 'QUARTER_FINALS'
                          | 'SEMI_FINALS'
                          | 'FINALS' = 'FINALS';
                        if (match.round === '8강') round = 'QUARTER_FINALS';
                        else if (match.round === '4강') round = 'SEMI_FINALS';
                        else if (match.round === '결승') round = 'FINALS';

                        return {
                          teamAId:
                            teamNameToIdMap.get(match.teamAName) || undefined,
                          teamBId:
                            teamNameToIdMap.get(match.teamBName) || undefined,
                          round,
                          turn: match.index || 1,
                          startDate:
                            match.startDate || new Date().toISOString(),
                          endDate:
                            match.endDate ||
                            new Date(Date.now() + 3600000).toISOString(),
                        };
                      },
                    );

                    gameObj.tournament = tournamentGames;
                  } else if (system === 'fullleague') {
                    const teamNameToIdMap = new Map();
                    teams.forEach(
                      (team: { teamId: number; teamName: string }) => {
                        teamNameToIdMap.set(team.teamName, team.teamId);
                      },
                    );

                    const leagueGames = savedMatches.map(
                      (
                        match: {
                          index?: number;
                          teamAName: string;
                          teamBName: string;
                          startDate?: string;
                          endDate?: string;
                        },
                        index: number,
                      ) => {
                        return {
                          teamAId: teamNameToIdMap.get(match.teamAName) || 1,
                          teamBId: teamNameToIdMap.get(match.teamBName) || 2,
                          leagueTurn: match.index || index + 1,
                          startDate:
                            match.startDate || new Date().toISOString(),
                          endDate:
                            match.endDate ||
                            new Date(Date.now() + 3600000).toISOString(),
                        };
                      },
                    );

                    gameObj.fullLeague = leagueGames;
                  }

                  confirmedGamesArray.push(gameObj);
                }
              }
            } catch (error) {
              console.error(error);
            }
          }

          if (confirmedGamesArray.length === 0) {
            toast.error('확인된 게임이 없습니다.');
            return;
          }

          let hasSuccessfulPost = false;

          for (const system of uniqueSystems) {
            const filteredGames = {
              games: confirmedGamesArray.filter((game) => {
                if (system === 'single' && game.single) return true;
                if (system === 'tournament' && game.tournament) return true;
                if (system === 'fullleague' && game.fullLeague) return true;
                return false;
              }),
            };

            if (filteredGames.games.length > 0) {
              try {
                await postStage(stageId, filteredGames, system);
                hasSuccessfulPost = true;
              } catch (error) {
                console.error(error);
                throw error;
              }
            }
          }

          if (hasSuccessfulPost) {
            toast.success('모집 종료가 완료되었습니다.');
            setTimeout(() => {
              router.push(`/stage/stageId=${stageId}`);
            }, 1000);
            return;
          } else {
            toast.error('모집 종료 처리에 실패했습니다.');
          }
        } catch (error) {
          console.error(error);
          toast.error(
            error instanceof Error
              ? error.message
              : '모집 종료에 실패했습니다.',
          );
        }
      }

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
              onClick={() => handleConfirm(gameId ? parseInt(gameId) : 0)}
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
