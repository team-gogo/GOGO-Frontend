import React from 'react';
import { TopRankListItem } from '@/entities/ranking';
import { RankItem } from '@/shared/types/ranking';
import { cn } from '@/shared/utils/cn';

interface TopRankListContainerProps {
  topRanks: RankItem[];
}

const TopRankListContainer = ({ topRanks }: TopRankListContainerProps) => {
  return (
    <div
      className={cn(
        'bg-gray-700',
        'w-full',
        'h-[16.3125rem]',
        'tablet:px-[2.625rem]',
        'tablet:py-[2.25rem]',
        'px-0',
        'py-0',
        'relative',
        'flex',
        'items-center',
        'rounded-xl',
      )}
    >
      <p
        className={cn(
          'text-white',
          'text-h3e',
          'absolute',
          'tablet:block',
          'hidden',
          'top-[36px]',
        )}
      >
        TOP 3
      </p>
      <div className={cn('flex', 'justify-evenly', 'w-full')}>
        {topRanks.map((rank, index) => (
          <TopRankListItem key={index} rank={rank} />
        ))}
      </div>
    </div>
  );
};

export default TopRankListContainer;
