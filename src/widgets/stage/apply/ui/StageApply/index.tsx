'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getStageMaintainer } from '@/entities/stage/api/getStageMaintainer';
import { useTeamDetailInfoStore } from '@/shared/stores';
import { MatchGameType } from '@/shared/types/stage/apply';
import Button from '@/shared/ui/button';
import MatchTypeLabel from '@/shared/ui/matchTypeLabel';
import SportTypeLabel from '@/shared/ui/sportTypelabel';
import { cn } from '@/shared/utils/cn';

interface StageApplyProps {
  game: MatchGameType;
  stageId: number;
  isConfirmed: boolean;
}

const StageApply = ({
  game,
  stageId,
  isConfirmed: initialIsConfirmed,
}: StageApplyProps) => {
  const { gameName, teamCount, category, isParticipating, gameId } = game;
  const { setCategory } = useTeamDetailInfoStore();
  const router = useRouter();
  const [isMaintainer, setIsMaintainer] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(initialIsConfirmed);

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

  useEffect(() => {
    const storedIsConfirmed = sessionStorage.getItem(`isConfirmed_${gameId}`);
    if (storedIsConfirmed === 'true') {
      setIsConfirmed(true);
    }
  }, [gameId]);

  const handleApply = () => {
    router.push(
      `/team/create/${stageId}?gameId=${gameId}&category=${category}`,
    );
  };

  const handleConfirm = () => {
    setCategory(category);
    if (isMaintainer) {
      router.push(`/team/confirm/${gameId}`);
    } else {
      toast.error('관리자만 접근할 수 있어요.');
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
          <div className={cn('flex', 'justify-center', 'w-full')}>
            {isConfirmed ? (
              <Button disabled={true} onClick={handleApply}>
                확정된 경기입니다.
              </Button>
            ) : (
              <div className={cn('flex', 'gap-[1rem]', 'w-full')}>
                <Button
                  className={cn('mx-10')}
                  disabled={isParticipating && !isMaintainer}
                  onClick={handleApply}
                >
                  신청하기
                </Button>
                {isMaintainer && (
                  <Button
                    className={cn('mx-10')}
                    onClick={handleConfirm}
                    bg="bg-[#FF4646]"
                  >
                    종료하기
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StageApply;
