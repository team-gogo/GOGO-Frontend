'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getStageMaintainer } from '@/entities/stage/api/getStageMaintainer';
import { MatchGameType } from '@/shared/types/stage/apply';
import Button from '@/shared/ui/button';
import MatchTypeLabel from '@/shared/ui/matchTypeLabel';
import SportTypeLabel from '@/shared/ui/sportTypelabel';
import { cn } from '@/shared/utils/cn';

interface StageApplyProps {
  game: MatchGameType;
  stageId: number;
}

const StageApply = ({ game, stageId }: StageApplyProps) => {
  const { gameName, teamCount, category, isParticipating, gameId } = game;
  const router = useRouter();
  const [isMaintainer, setIsMaintainer] = useState(false);

  useEffect(() => {
    const checkMaintainer = async () => {
      try {
        const response = await getStageMaintainer(String(stageId));
        setIsMaintainer(response.isMaintainer);
      } catch (error) {
        console.error(error);
      }
    };

    checkMaintainer();
  }, [stageId]);

  const handleApply = () => {
    if (isMaintainer) {
      router.push(`/team/confirm?matchId=${gameId}`);
    } else {
      router.push(`/team/create?matchId=${gameId}&category=${category}`);
    }
  };

  return (
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
        'h-full',
      )}
    >
      <div
        className={cn(
          'flex',
          'flex-col',
          'justify-center',
          'gap-[3rem]',
          'flex-grow',
        )}
      >
        <div
          className={cn('flex', 'w-full', 'justify-between', 'items-center')}
        >
          <div className={cn('flex', 'items-center', 'gap-[1.5rem]')}>
            <SportTypeLabel type={category} />
            <MatchTypeLabel
              type={'TEAM'}
              customText={String(teamCount)}
              color="#97A9FF"
            />
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
          <h1 className={cn('text-body1e', 'text-white', 'laptop:text-body2e')}>
            {gameName}
          </h1>
          <div className={cn('flex', 'w-full', 'justify-center')}>
            <Button
              disabled={isParticipating && !isMaintainer}
              onClick={handleApply}
            >
              {isMaintainer ? '종료하기' : '신청하기'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StageApply;
