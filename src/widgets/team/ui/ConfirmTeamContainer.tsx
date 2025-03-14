'use client';

import { useState, useCallback } from 'react';
import SelectedTeamCounter from '@/entities/team/ui/SelectedTeamCounter';
import TeamItem from '@/entities/team/ui/TeamItem';
import ButtonCheckIcon from '@/shared/assets/svg/ButtonCheckIcon';
import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';

import { getTeamItemMock } from '../Mock/getTeamItemMock';

const ConfirmTeamContainer = () => {
  const [selectedTeamIds, setSelectedTeamIds] = useState<number[]>([]);
  const teams = getTeamItemMock();

  const handleViewDetails = useCallback((_teamId: number) => {
    // TODO: 팀 자세히보기 클릭했을 때
  }, []);

  const handleConfirmTeam = useCallback(() => {
    // TODO: 팀 확정하기 클릭했을 때
  }, []);

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
        <h1 className={cn('text-h4s', 'text-gray-100')}>현재 등록된 팀들</h1>
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
              onClick={
                selectedTeamIds.length > 0 ? handleConfirmTeam : undefined
              }
              className={cn(
                'h-[50px]',
                'w-[160px]',
                'rounded-md',
                'flex',
                'items-center',
                'justify-center',
                'px-24',
                'text-body3s',
                selectedTeamIds.length === 0
                  ? 'border-[2px] border-solid border-[#526FFE] text-[#526FFE]'
                  : 'bg-[#526FFE] text-white',
              )}
            >
              <span className="mr-10">팀 확정하기</span>
              <ButtonCheckIcon
                color={selectedTeamIds.length === 0 ? '#526FFE' : 'white'}
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
