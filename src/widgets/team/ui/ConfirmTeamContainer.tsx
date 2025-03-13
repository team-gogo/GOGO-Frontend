'use client';

import { useState } from 'react';
import { cn } from '@/shared/utils/cn';
import BackPageButton from '@/shared/ui/backPageButton';
import Button from '@/shared/ui/button';
import TeamItem from '@/entities/team/ui/TeamItem';
import { getTeamItemMock } from '../Mock/getTeamItemMock';

const ConfirmTeamContainer = () => {
  const [selectedTeamIds, setSelectedTeamIds] = useState<number[]>([]);
  const teams = getTeamItemMock();

  const handleViewDetails = (teamId: number) => {};

  const handleConfirmTeam = () => {};

  const handleToggleSelect = (teamId: number) => {
    setSelectedTeamIds((prev) => {
      if (prev.includes(teamId)) {
        return prev.filter((id) => id !== teamId);
      } else {
        return [...prev, teamId];
      }
    });
  };

  return (
    <div className={cn('min-h-screen', 'bg-black')}>
      <div className={cn('pt-16', 'pb-20')}>
        <BackPageButton type="back" label="뒤로가기" />
      </div>

      <div className={cn('flex', 'items-center', 'justify-between', 'mb-24')}>
        <h1 className={cn('text-h4s', 'text-gray-100')}>현재 등록된 팀들</h1>
        <div className={cn('flex', 'items-center', 'gap-8')}>
          <div
            className={cn(
              'text-body3s',
              'text-gray-400',
              'flex',
              'items-center',
              'gap-3',
              'mr-20',
            )}
          >
            <span>선택된 팀 개수</span>
            <span className="text-body2s text-gray-100">
              {selectedTeamIds.length}
            </span>
          </div>
          <div className="w-[200px]">
            <Button
              onClick={handleConfirmTeam}
              className={cn(
                'rounded-full',
                'flex',
                'items-center',
                'justify-center',
                'gap-2',
                'bg-blue-600',
                'h-[40px]',
                'transition-colors',
              )}
            >
              팀 확정하기
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-10">
        {teams.map((team) => (
          <TeamItem
            key={team.id}
            teamName={team.name}
            onViewDetails={() => handleViewDetails(team.id)}
            isSelected={selectedTeamIds.includes(team.id)}
            onToggleSelect={() => handleToggleSelect(team.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ConfirmTeamContainer;
