'use client';

import { useRouter } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getTempTeam } from '@/entities/team/api/getTempTeam';
import SelectedTeamCounter from '@/entities/team/ui/SelectedTeamCounter';
import TeamItem from '@/entities/team/ui/TeamItem';
import ButtonCheckIcon from '@/shared/assets/svg/ButtonCheckIcon';
import {
  useTeamDetailInfoStore,
  useTeamDetailModalStore,
} from '@/shared/stores';
import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import { getMatchApplyList } from '@/views/stage/apply/api/getMatchApplyList';

interface ConfirmTeamContainerProps {
  params: {
    gameId: string;
  };
}

const ConfirmTeamContainer = ({ params }: ConfirmTeamContainerProps) => {
  const { setTeamId } = useTeamDetailInfoStore();
  const { setIsTeamDetailModalOpen, setIsConfirmUsed } =
    useTeamDetailModalStore();

  const [selectedTeamIds, setSelectedTeamIds] = useState<number[]>([]);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [teams, setTeams] = useState<
    Array<{ teamId: number; teamName: string; participantCount: number }>
  >([]);
  const { gameId } = params;
  const router = useRouter();

  useEffect(() => {
    const fetchTeams = async () => {
      if (!gameId) {
        toast.error('게임 정보가 없습니다.');
        return;
      }

      try {
        const response = await getTempTeam(gameId);
        setTeams(response.team);
      } catch (error) {
        console.error(error);
        toast.error('팀 목록을 불러오는데 실패했습니다.');
      }
    };
    fetchTeams();
  }, [gameId]);

  useEffect(() => {
    const updateButtonState = async () => {
      try {
        const stageId = sessionStorage.getItem(`stageId_${gameId}`);
        if (!stageId) return;

        const response = await getMatchApplyList(Number(stageId));
        const foundGame = response.games.find(
          (g) => g.gameId.toString() === gameId,
        );

        if (!foundGame) return;

        if (foundGame.system === 'TOURNAMENT') {
          setIsButtonEnabled(
            selectedTeamIds.length >= 3 && selectedTeamIds.length <= 8,
          );
        } else if (
          foundGame.system === 'FULL_LEAGUE' ||
          foundGame.system === 'SINGLE'
        ) {
          setIsButtonEnabled(selectedTeamIds.length >= 2);
        }
      } catch (error) {
        console.error(error);
      }
    };

    updateButtonState();
  }, [selectedTeamIds, gameId]);

  const handleViewDetails = useCallback((_teamId: number) => {
    setTeamId(_teamId);
    setIsConfirmUsed(true);
    setIsTeamDetailModalOpen(true);
  }, []);

  const handleConfirmTeam = useCallback(async () => {
    const selectedTeams = teams.filter((team) =>
      selectedTeamIds.includes(team.teamId),
    );
    sessionStorage.setItem(
      `confirmedTeams_${gameId}`,
      JSON.stringify(selectedTeams),
    );

    try {
      const stageId = sessionStorage.getItem(`stageId_${gameId}`);
      if (!stageId) {
        toast.error('스테이지 정보를 찾을 수 없습니다.');
        return;
      }

      const response = await getMatchApplyList(Number(stageId));
      const foundGame = response.games.find(
        (g) => g.gameId.toString() === gameId,
      );

      if (!foundGame) {
        toast.error('게임 정보를 찾을 수 없습니다.');
        return;
      }

      if (foundGame.system === 'TOURNAMENT') {
        if (selectedTeamIds.length < 3 || selectedTeamIds.length > 8) {
          toast.error('3개 이상 8개 이하의 팀을 선택해주세요.');
          setIsButtonEnabled(false);
          return;
        }
        router.push(
          `/stage/bracket?gameId=${gameId}&system=${foundGame.system}`,
        );
      } else if (
        foundGame.system === 'FULL_LEAGUE' ||
        foundGame.system === 'SINGLE'
      ) {
        if (selectedTeamIds.length < 2) {
          toast.error('최소 2개 이상의 팀을 선택해주세요.');
          setIsButtonEnabled(false);
          return;
        }
        sessionStorage.setItem(
          `confirmedTeams_${gameId}`,
          JSON.stringify(selectedTeams),
        );
        router.push(`/stage/time?gameId=${gameId}&system=${foundGame.system}`);
      }
    } catch (error) {
      console.error(error);
      toast.error('게임 정보를 불러오는데 실패했습니다.');
      setIsButtonEnabled(false);
    }
  }, [teams, selectedTeamIds, router, gameId]);

  const handleToggleSelect = useCallback((teamId: number) => {
    setSelectedTeamIds((prev) => {
      if (prev.includes(teamId)) {
        return prev.filter((id) => id !== teamId);
      }
      return [...prev, teamId];
    });
  }, []);

  return (
    <div className={cn('min-h-screen')}>
      <header className={cn('mt-24', 'mb-24')}>
        <BackPageButton type="back" label="뒤로가기" />
      </header>

      <div
        className={cn(
          'flex',
          'items-center',
          'justify-between',
          'mb-30',
          'mt-30',
        )}
      >
        <h1 className={cn('text-h3e', 'text-white', 'mb-28', 'mt-28')}>
          현재 등록된 팀들
        </h1>
        <div className={cn('flex', 'items-center', 'gap-8', 'ml-auto')}>
          <SelectedTeamCounter count={selectedTeamIds.length} />
          <div
            className={cn(
              'flex',
              'items-center',
              'justify-center',
              'h-[40px]',
              'w-[160px]',
              'ml-auto',
            )}
          >
            <button
              onClick={handleConfirmTeam}
              className={cn(
                'h-[50px]',
                'w-[160px]',
                'rounded-md',
                'flex',
                'items-center',
                'justify-center',
                'px-24',
                'text-body3s',
                !isButtonEnabled
                  ? 'cursor-not-allowed border-[2px] border-solid border-[#526FFE] text-[#526FFE]'
                  : 'cursor-pointer bg-[#526FFE] text-white',
              )}
            >
              <span className="mr-10">팀 확정하기</span>
              <ButtonCheckIcon color={!isButtonEnabled ? '#526FFE' : 'white'} />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-10">
        {teams.map((team) => (
          <TeamItem
            key={team.teamId}
            teamName={team.teamName}
            onViewDetails={() => handleViewDetails(team.teamId)}
            isSelected={selectedTeamIds.includes(team.teamId)}
            onToggleSelect={() => handleToggleSelect(team.teamId)}
          />
        ))}
      </div>
    </div>
  );
};

export default ConfirmTeamContainer;
