'use client';

import { useParams } from 'next/navigation';
import React from 'react';
import { useTeamDetailModalStore } from '@/shared/stores';
import BackPageButton from '@/shared/ui/backPageButton';
import TeamDetailModal from '@/shared/ui/teamDetailModal';
import { cn } from '@/shared/utils/cn';
import RegisterContainer from '@/widgets/stage/teams/registered/ui/RegisterContainer';

const StageTeamsRegisteredPage = () => {
  const params = useParams<{ gameId: string; stageId: string }>();
  const { gameId, stageId } = params;

  const { isTeamDetailModalOpen, setIsTeamDetailModalOpen } =
    useTeamDetailModalStore();

  return (
    <div
      className={cn('flex', 'w-full', 'justify-center', 'px-16', 'pb-[2.5rem]')}
    >
      <div
        className={cn(
          'w-full',
          'h-full',
          'flex',
          'flex-col',
          'justify-center',
          'items-center',
          'max-w-[1320px]',
          'gap-[2.5rem]',
        )}
      >
        <div
          className={cn(
            'w-full',
            'h-full',
            'pt-[2.25rem]',
            'flex',
            'flex-col',
            'gap-[2rem]',
          )}
        >
          <div className={cn('space-y-[48px]')}>
            <BackPageButton type="push" path={`/stage/stageId=${stageId}`} />
            <div className={cn('space-y-24')}>
              <RegisterContainer stageId={stageId} gameId={gameId} />
            </div>
          </div>
        </div>
      </div>

      {isTeamDetailModalOpen && (
        <TeamDetailModal
          isWin={false}
          onClose={() => setIsTeamDetailModalOpen(false)}
        />
      )}
    </div>
  );
};

export default StageTeamsRegisteredPage;
