'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { postStage } from '@/entities/stage/api/postStage';
import { usePostPassCode } from '@/entities/stage/ui/model/usePostPassCode';
import KebabMenuIcon from '@/shared/assets/icons/KebabMenuIcon';
import {
  useMyStageIdStore,
  usePasswordModalStore,
  useStageStatus,
} from '@/shared/stores';
import useStageNameStore from '@/shared/stores/useStageNameStore';
import { MyStageType } from '@/shared/types/my';
import { StagesType } from '@/shared/types/stage';
import { cn } from '@/shared/utils/cn';
import { getMatchApplyList } from '@/views/stage/apply/api/getMatchApplyList';
import Button from '../button';
import MatchTypeLabel from '../matchTypeLabel';

interface StageProps {
  stage: MyStageType | StagesType;
  isMyStage?: boolean;
}

const Stage = ({ stage, isMyStage = false }: StageProps) => {
  const { stageId, stageName, type, status, isMaintainer } = stage;
  const [menuOpen, setMenuOpen] = useState(false);

  const { mutate: PostPassCode } = usePostPassCode(stageId);

  const { push } = useRouter();
  const pathname = usePathname();

  const { setStageName } = useStageNameStore();
  const { setIsPasswordModalOpen, setClickedStageId } = usePasswordModalStore();
  const { setStageId } = useMyStageIdStore();
  const { setIsStatusConfirmed } = useStageStatus();

  const isParticipating =
    'isParticipating' in stage ? stage.isParticipating : undefined;

  const isPassCode = 'isPassCode' in stage ? stage.isPassCode : undefined;

  const Participate = isParticipating || isMyStage;

  const isStagePage = pathname === '/stage';

  useEffect(() => {
    setStageId(Number(stageId));
  }, []);

  const handleClick = () => {
    if (isMyStage) {
      setStageId(stageId);
      push(`/my/bet/${stageId}`);
    } else if (status === 'CONFIRMED') {
      setIsStatusConfirmed(true);
      if (!isParticipating) {
        if (isPassCode) {
          setIsPasswordModalOpen(true);
          setClickedStageId(stageId);
        } else {
          PostPassCode(undefined);
          setStageName(stageName);
        }
      } else if (isParticipating && isStagePage) {
        push(`/${stageId}`);
      }
    } else if (isParticipating) {
      push(`/stage/stageId=${stage.stageId}`);
    } else if (Participate) {
      setStageId(stageId);
      if (isStagePage) {
        push(`/${stageId}`);
      } else {
        setStageId(stageId);
        push(`/my/bet/${stageId}`);
      }
    } else if (isPassCode) {
      setIsPasswordModalOpen(true);
      setClickedStageId(stageId);
    } else {
      setIsStatusConfirmed(false);
      PostPassCode(undefined);
      setStageName(stageName);
    }
  };

  const handleEndRecruitment = async () => {
    setMenuOpen(false);

    try {
      let stageGames = [];
      try {
        const response = await getMatchApplyList(stageId);
        stageGames = response.games || [];
      } catch (error) {
        toast.error('스테이지 게임 정보를 가져오는데 실패했습니다.');
        return;
      }

      const systemTypes = stageGames.map((game) => game.system.toLowerCase());
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
                teams.forEach((team: { teamId: number; teamName: string }) => {
                  teamNameToIdMap.set(team.teamName, team.teamId);
                });

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
                      startDate: match.startDate || new Date().toISOString(),
                      endDate:
                        match.endDate ||
                        new Date(Date.now() + 3600000).toISOString(),
                    };
                  },
                );

                gameObj.tournament = tournamentGames;
              } else if (system === 'fullleague') {
                const teamNameToIdMap = new Map();
                teams.forEach((team: { teamId: number; teamName: string }) => {
                  teamNameToIdMap.set(team.teamName, team.teamId);
                });

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
                      startDate: match.startDate || new Date().toISOString(),
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
          } catch (error) {
            console.error(error);
            throw error;
          }
        }
      }

      toast.success('모집 종료가 완료되었습니다.');

      if ('status' in stage) {
        (stage as MyStageType | StagesType).status = 'CONFIRMED';
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : '모집 종료에 실패했습니다.',
      );
    }
  };

  return (
    <>
      <div
        className={cn(
          'flex',
          'flex-col',
          'p-[1.5rem]',
          'px-[2rem]',
          'rounded-xl',
          'bg-gray-700',
          'max-w-[40rem]',
          'w-full',
        )}
      >
        <div className={cn('flex', 'flex-col', 'justify-center', 'gap-[3rem]')}>
          <div
            className={cn('flex', 'w-full', 'justify-between', 'items-center')}
          >
            <div className={cn('flex', 'items-center', 'gap-[1.5rem]')}>
              <MatchTypeLabel
                type={type === 'OFFICIAL' ? 'OFFICIAL' : 'FAST'}
                color="#FFF"
              />

              {status === 'RECRUITING' ? (
                <MatchTypeLabel type="RECRUITING" color="#01C612" />
              ) : status === 'CONFIRMED' ? (
                <MatchTypeLabel type="CONFIRMED" color="#898989" />
              ) : null}
              {isMaintainer && <MatchTypeLabel type="ADMIN" color="#526FFE" />}
            </div>
            <div className="relative">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                <KebabMenuIcon />
              </button>
              {menuOpen && (
                <>
                  <div
                    className={cn('fixed', 'inset-0', 'z-10')}
                    onClick={() => setMenuOpen(false)}
                  />
                  <div
                    className={cn(
                      'absolute',
                      'right-0',
                      'top-[2rem]',
                      'z-20',
                      'rounded-xl',
                      'bg-gray-700',
                      'py-[1.5rem]',
                      'px-[2rem]',
                      'shadow-[0px_0px_18px_0px_rgba(0,0,0,0.25)]',
                      'min-w-[11rem]',
                    )}
                  >
                    <div
                      className={cn(
                        'flex',
                        'flex-col',
                        'items-center',
                        'gap-[1.5rem]',
                      )}
                    >
                      {isMaintainer ? (
                        <>
                          <button
                            className={cn(
                              'text-body2s',
                              'text-gray-400',
                              'hover:text-white',
                            )}
                            onClick={() => {
                              setMenuOpen(false);
                            }}
                          >
                            스테이지 종료
                          </button>
                          <button
                            className={cn(
                              'text-body2s',
                              'text-gray-400',
                              'hover:text-white',
                            )}
                            onClick={() => {
                              setMenuOpen(false);
                            }}
                          >
                            중계 설정
                          </button>
                          <button
                            className={cn(
                              'text-body2s',
                              'text-gray-400',
                              'hover:text-white',
                            )}
                            onClick={() => {
                              setMenuOpen(false);
                              handleEndRecruitment();
                            }}
                          >
                            모집 종료
                          </button>
                        </>
                      ) : null}
                      <button
                        className={cn(
                          'text-body2s',
                          'text-gray-400',
                          'hover:text-white',
                        )}
                        onClick={() => {
                          setMenuOpen(false);
                        }}
                      >
                        취소
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div
            className={cn(
              'flex',
              'w-full',
              'flex-col',
              'items-center',
              'gap-[3rem]',
            )}
          >
            <h1 className={cn('text-h2e', 'text-white', 'laptop:text-body2e')}>
              {stageName}
            </h1>
            <Button
              isLocked={!Participate && isPassCode}
              onClick={() => handleClick()}
            >
              {isStagePage ? '참여하기' : '상세보기'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stage;
