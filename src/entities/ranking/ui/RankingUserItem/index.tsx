import React from 'react';
import { useUserStore } from '@/shared/stores';
import { RankItem } from '@/shared/types/ranking';
import { cn } from '@/shared/utils/cn';

interface RankingUserItemProps {
  rank: RankItem;
  isMainUsed?: boolean;
}

const RankingUserItem = ({ rank, isMainUsed }: RankingUserItemProps) => {
  const { studentId } = useUserStore();

  return (
    <div
      className={cn(
        'w-full',
        isMainUsed ? 'h-[2.375rem]' : 'h-[3.75rem]',
        isMainUsed ? 'px-[1rem]' : 'px-24',
        isMainUsed ? 'py-[0.5rem]' : 'py-12',
        'flex',
        'justify-between',
        'bg-gray-700',
        'rounded-lg',
        'items-center',
      )}
    >
      <div className={cn('flex', 'items-center', 'gap-[2.5rem]')}>
        <p
          className={cn(
            'text-white',
            isMainUsed ? 'mobile:text-caption1e' : 'mobile:text-body1e',
            'text-body3e',
          )}
        >
          {rank.rank}등
        </p>
        <p
          className={cn(
            rank.studentId === studentId ? 'text-white' : 'text-gray-300',
            isMainUsed ? 'mobile:text-caption1s' : 'mobile:text-body2s',
            'text-caption1s',
          )}
        >
          {rank.name}
        </p>
      </div>
      <p
        className={cn(
          isMainUsed ? 'mobile:text-caption1s' : 'mobile:text-body1s',
          isMainUsed ? 'text-white' : 'text-main-400',
          'text-body3s',
        )}
      >
        {rank.point.toLocaleString() || 0}P
      </p>
    </div>
  );
};

export default RankingUserItem;
