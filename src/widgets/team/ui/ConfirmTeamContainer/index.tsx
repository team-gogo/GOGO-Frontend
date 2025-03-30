'use client';

import { useRouter } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getTempTeam } from '@/entities/team/api/getTempTeam';
import SelectedTeamCounter from '@/entities/team/ui/SelectedTeamCounter';
import TeamItem from '@/entities/team/ui/TeamItem';
import ButtonCheckIcon from '@/shared/assets/svg/ButtonCheckIcon';
import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';

interface ConfirmTeamContainerProps {
  params: {
    matchId: string;
  };
}

const ConfirmTeamContainer = ({ params }: ConfirmTeamContainerProps) => {
  const [selectedTeamIds, setSelectedTeamIds] = useState<number[]>([]);
  const [teams, setTeams] = useState<
    Array<{ teamId: number; teamName: string; participantCount: number }>
  >([]);
  const { matchId } = params;
  const router = useRouter();

  useEffect(() => {
    const fetchTeams = async () => {
      if (!matchId) {
        toast.error('게임 정보가 없습니다.');
        return;
      }

      try {
        const response = await getTempTeam(matchId);
        setTeams(response.team);
      } catch (error) {
        console.error(error);
        toast.error('팀 목록을 불러오는데 실패했습니다.');
      }
    };
    fetchTeams();
  }, [matchId]);

  const handleViewDetails = useCallback((_teamId: number) => {
    // TODO: 팀 자세히보기 클릭했을 때
  }, []);

  const handleConfirmTeam = useCallback(() => {
    if (selectedTeamIds.length < 3) {
      toast.error('최소 3개 이상의 팀을 선택해주세요.');
      return;
    }

    const selectedTeams = teams.filter((team) =>
      selectedTeamIds.includes(team.teamId),
    );
    sessionStorage.setItem(
      `confirmedTeams_${matchId}`,
      JSON.stringify(selectedTeams),
    );
    router.push(`/stage/bracket?matchId=${matchId}`);
  }, [teams, selectedTeamIds, router, matchId]);

  const handleToggleSelect = useCallback((teamId: number) => {
    setSelectedTeamIds((prev) => {
      if (prev.includes(teamId)) {
        return prev.filter((id) => id !== teamId);
      }
      return [...prev, teamId];
    });
  }, []);

  return (
    <div className={cn('min-h-screen', 'bg-black')}>
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
                selectedTeamIds.length < 3
                  ? 'border-[2px] border-solid border-[#526FFE] text-[#526FFE]'
                  : 'bg-[#526FFE] text-white',
              )}
            >
              <span className="mr-10">팀 확정하기</span>
              <ButtonCheckIcon
                color={selectedTeamIds.length < 3 ? '#526FFE' : 'white'}
              />
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
