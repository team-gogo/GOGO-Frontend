'use client';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { GameSystem, Game } from '@/shared/types/stage/game';
import BackPageButton from '@/shared/ui/backPageButton';
import Button from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';
import { useStageStore } from '@/store/stageStore';
import { getMatchApplyList } from '@/views/stage/apply/api/getMatchApplyList';
import { getStageList } from '@/views/stage/ui/api/getStageList';
import SetTimeContainer from '@/widgets/stage/time/ui/SetTimeContainer';

interface SavedMatchData {
  round: string;
  index: number;
  startDate: string;
  endDate: string;
  teamAName: string;
  teamBName: string;
}

const MATCH_CHECK_INTERVAL = 1000;

const SetTimePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const gameId = searchParams.get('gameId');
  const systemParam = searchParams.get('system') || GameSystem.FULL_LEAGUE;
  const system = systemParam as GameSystem;
  const { setStageGames } = useStageStore();
  const [savedMatches, setSavedMatches] = useState<SavedMatchData[]>([]);

  const [stageId, setStageId] = useState<number | null>(null);
  const [allMatchesScheduled, setAllMatchesScheduled] = useState(true);

  const checkMatchesScheduled = useCallback(() => {
    if (typeof window !== 'undefined' && gameId) {
      const savedMatchesKey = `savedMatches_${gameId}`;
      const savedMatchesData = sessionStorage.getItem(savedMatchesKey);

      const systemParam =
        new URLSearchParams(window.location.search).get('system') || '';
      const isFullLeague = systemParam === 'FULL_LEAGUE';

      if (isFullLeague) {
        if (!savedMatchesData) {
          setAllMatchesScheduled(false);
          return;
        }

        try {
          const savedMatches = JSON.parse(savedMatchesData);

          const confirmedTeamsKey = `confirmedTeams_${gameId}`;
          const confirmedTeamsData = sessionStorage.getItem(confirmedTeamsKey);

          if (confirmedTeamsData) {
            const teams = JSON.parse(confirmedTeamsData);
            const totalTeamCount = teams.length;
            const requiredMatchCount =
              (totalTeamCount * (totalTeamCount - 1)) / 2;

            setAllMatchesScheduled(savedMatches.length >= requiredMatchCount);
          } else {
            setAllMatchesScheduled(savedMatches.length > 0);
          }
          return;
        } catch (error) {
          console.error(error);
          setAllMatchesScheduled(false);
          return;
        }
      }

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
    try {
      const currentStageId = parseInt(searchParams.get('stageId') || '0', 10);
      const games = [];
      const teamNameToIdMap = new Map<string, string>();

      try {
        const confirmedTeamsKey = `confirmedTeams_${gameId}`;
        const confirmedTeamsData = sessionStorage.getItem(confirmedTeamsKey);

        if (confirmedTeamsData) {
          const parsedTeams = JSON.parse(confirmedTeamsData);
          parsedTeams.forEach((team: { teamId: number; teamName: string }) => {
            teamNameToIdMap.set(team.teamName, team.teamId.toString());
          });
        }
      } catch (error) {
        console.error(error);
        toast.error('팀 정보를 불러오는데 실패했습니다.');
        return;
      }

      if (system === GameSystem.TOURNAMENT) {
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

        if (tournamentGames.length === 0) {
          toast.error('매치 시간을 먼저 설정해주세요.');
          return;
        }

        games.push({
          gameId: parseInt(gameId || '0', 10),
          system: GameSystem.TOURNAMENT,
          tournament: tournamentGames,
        });
      } else if (system === GameSystem.FULL_LEAGUE) {
        const leagueGames = savedMatches.map((match, index) => ({
          teamAId: parseInt(teamNameToIdMap.get(match.teamAName) || '0', 10),
          teamBId: parseInt(teamNameToIdMap.get(match.teamBName) || '0', 10),
          startDate: match.startDate,
          endDate: match.endDate,
          leagueTurn: index + 1,
        }));

        if (leagueGames.length === 0) {
          toast.error('매치 시간을 먼저 설정해주세요.');
          return;
        }

        games.push({
          gameId: parseInt(gameId || '0', 10),
          system: GameSystem.FULL_LEAGUE,
          fullLeague: leagueGames,
        });
      } else if (system === GameSystem.SINGLE) {
        const singleMatch = savedMatches[0];
        if (!singleMatch) {
          toast.error('매치 시간을 먼저 설정해주세요.');
          return;
        }

        games.push({
          gameId: parseInt(gameId || '0', 10),
          system: GameSystem.SINGLE,
          single: {
            teamAId: parseInt(
              teamNameToIdMap.get(singleMatch.teamAName) || '0',
              10,
            ),
            teamBId: parseInt(
              teamNameToIdMap.get(singleMatch.teamBName) || '0',
              10,
            ),
            startDate: singleMatch.startDate,
            endDate: singleMatch.endDate,
          },
        });
      }

      setStageGames(currentStageId, games as Game[]);
      toast.success('경기 일정이 저장되었습니다.');

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
    } catch (error) {
      console.error(error);
      toast.error('저장 중 오류가 발생했습니다.');
    }
  };

  const handleMatchSave = useCallback(() => {
    checkMatchesScheduled();
  }, [checkMatchesScheduled]);

  useEffect(() => {
    if (typeof window !== 'undefined' && gameId) {
      const savedMatchesKey = `savedMatches_${gameId}`;
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
  }, [gameId]);

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
          <SetTimeContainer
            onMatchSave={handleMatchSave}
            savedMatches={savedMatches}
            system={system}
            matchId={parseInt(gameId || '0', 10)}
          />
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
