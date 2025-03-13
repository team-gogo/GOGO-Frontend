'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/shared/utils/cn';
import BackPageButton from '@/shared/ui/backPageButton';
import Button from '@/shared/ui/button';
import TeamItem from '@/entities/team/ui/TeamItem';
import { getTeamItemMock } from '../Mock/getTeamItemMock';
import SelectedTeamCounter from '@/entities/team/ui/SelectedTeamCounter';

const ConfirmTeamContainer = () => {
  const [selectedTeamIds, setSelectedTeamIds] = useState<number[]>([]);
  const teams = getTeamItemMock();

  const handleViewDetails = useCallback((teamId: number) => {
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
      <header className={cn('pt-16', 'pb-20')}>
        <BackPageButton type="back" label="뒤로가기" />
      </header>

      <div className={cn('flex', 'items-center', 'justify-between', 'mb-24')}>
        <h1 className={cn('text-h4s', 'text-gray-100')}>현재 등록된 팀들</h1>
        <div className={cn('flex', 'items-center', 'gap-8')}>
          <SelectedTeamCounter count={selectedTeamIds.length} />
          <div className={`h-[40px] w-[200px]`}>
            {selectedTeamIds.length === 0 ? (
              <Button
                bg="None"
                textColor="text-blue-600"
                borderStyle="border-solid"
                borderColor="border-2"
                className={cn(
                  'rounded-full',
                  'flex',
                  'items-center',
                  'justify-center',
                  'gap-2',
                  'h-[40px]',
                )}
              >
                팀 확정하기
              </Button>
            ) : (
              <Button
                onClick={handleConfirmTeam}
                bg="bg-blue-600"
                textColor="text-white"
                className={cn(
                  'rounded-full',
                  'flex',
                  'items-center',
                  'justify-center',
                  'gap-2',
                  'h-[40px]',
                )}
              >
                팀 확정하기
              </Button>
            )}
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
