import React from 'react';
import { TopRankListItem } from '@/entities/ranking';
import { RankItem } from '@/shared/types/ranking';
import { cn } from '@/shared/utils/cn';

interface TopRankListContainerProps {
  topRanks: RankItem[];
}

const TopRankListContainer = ({ topRanks }: TopRankListContainerProps) => {
  const maxPoint = Math.max(...topRanks.map((rank) => rank.point));

  return (
    <div
      className={cn(
        'w-full',
        'border-4',
        'border-solid',
        'border-gray-600',
        'h-[292px]',
        'rounded-lg',
        'bg-gray-700',
        'flex',
        'flex-col',
        'relative',
      )}
    >
      <p
        className={cn(
          'absolute',
          'top-5',
          'left-5',
          'text-white',
          'text-h3e',
          'mobile:text-body2e',
        )}
      >
        Top 3
      </p>

      <div
        className={cn(
          'flex',
          'justify-evenly',
          'flex-grow',
          'items-end',
          'h-full',
          'mobile:gap-16',
          'mobile:px-16',
        )}
      >
        {topRanks.map((rank) => (
          <TopRankListItem
            key={rank.studentId}
            rank={rank}
            maxPoint={maxPoint}
          />
        ))}
      </div>
    </div>
  );
};

export default TopRankListContainer;
