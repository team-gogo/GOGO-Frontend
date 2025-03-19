import React from 'react';
import { RankItem } from '@/shared/types/ranking';
import { cn } from '@/shared/utils/cn';

interface RankingUserItemProps {
  rank: RankItem;
}

const RankingUserItem = ({ rank }: RankingUserItemProps) => {
  return (
    <div
      className={cn(
        'w-full',
        'h-[3.75rem]',
        'px-24',
        'py-12',
        'flex',
        'justify-between',
        'bg-gray-600',
        'rounded-lg',
        'items-center',
      )}
    >
      <div className={cn('flex', 'items-center', 'gap-[2.5rem]')}>
        <p className={cn('text-white', 'text-body1e', 'mobile:text-body3e')}>
          {rank.rank}등
        </p>
        <p
          className={cn(
            'text-gray-300',
            'text-body2s',
            'mobile:text-caption1s',
          )}
        >
          {rank.name}
        </p>
      </div>
      <p className={cn('text-body1s', 'text-main-400', 'mobile:text-body3s')}>
        {rank.point || 0}P
      </p>
    </div>
  );
};

export default RankingUserItem;
