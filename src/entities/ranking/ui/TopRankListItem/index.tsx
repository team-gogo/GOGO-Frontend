import React from 'react';
import { Medal, PointIcon } from '@/shared/assets/svg';
import { RankItem } from '@/shared/types/ranking';
import { cn } from '@/shared/utils/cn';

interface TopRankListItemProps {
  rank: RankItem | null;
}

const TopRankListItem = ({ rank }: TopRankListItemProps) => {
  if (!rank) {
    return (
      <div className={cn('flex', 'flex-col', 'items-center', 'space-y-4')}>
        <div className={cn('flex', 'items-center', 'justify-center', 'gap-4')}>
          <p className={cn('text-caption1s', 'text-main-400')}>0</p>
          <PointIcon size={16} fill="#748CFE" />
        </div>
        <p className={cn('text-white', 'text-body2e')}>공석</p>
        <Medal
          primaryColor="#4D4D4D"
          secondaryColor="#4D4D4D"
          rank={0}
          className="h-[100px] w-[100px] mobile:h-[80px] mobile:w-[80px]"
        />
      </div>
    );
  }

  const getMedalColors = (rank: number) => {
    switch (rank) {
      case 1:
        return { primary: '#A07102', secondary: '#FAE28D' };
      case 2:
        return { primary: '#6F6F6F', secondary: '#D5D5D5' };
      case 3:
        return { primary: '#692814', secondary: '#B35933' };
      default:
        return { primary: '#4D4D4D', secondary: '#4D4D4D' }; // Changed default color
    }
  };

  const medalColors = getMedalColors(rank.rank);

  return (
    <div className={cn('flex', 'flex-col', 'items-center', 'space-y-4')}>
      <div className={cn('flex', 'items-center', 'justify-center', 'gap-4')}>
        <p className={cn('text-caption1s', 'text-main-400')}>
          {rank.point || 0}
        </p>
        <PointIcon size={16} fill="#748CFE" />
      </div>
      <p className={cn('text-white', 'text-body2e')}>{rank.name}</p>
      <Medal
        primaryColor={medalColors.primary}
        secondaryColor={medalColors.secondary}
        rank={rank.rank}
        className="h-[100px] w-[100px] mobile:h-[80px] mobile:w-[80px]"
      />
    </div>
  );
};

export default TopRankListItem;
