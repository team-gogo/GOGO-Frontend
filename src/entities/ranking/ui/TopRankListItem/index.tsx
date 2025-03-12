import React from 'react';
import { PointIcon, RankBar } from '@/shared/assets/svg';
import { RankItem } from '@/shared/types/ranking';
import { cn } from '@/shared/utils/cn';

interface TopRankListItemProps {
  rank: RankItem;
  maxPoint: number;
}

const TopRankListItem = ({ rank, maxPoint }: TopRankListItemProps) => {
  const heightPercentage = (rank.point / maxPoint) * 100;

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return '#2F52FE';
      case 2:
        return '#748CFE';
      case 3:
        return '#BAC5FF';
      default:
        return '#2F52FE';
    }
  };

  return (
    <div className={cn('flex', 'flex-col', 'items-center', 'space-y-4')}>
      <div className={cn('flex', 'items-center', 'justify-center', 'gap-4')}>
        <p className={cn('text-caption1s', 'text-main-400')}>
          {rank.point || 0}
        </p>
        <PointIcon size={16} fill="#748CFE" />
      </div>
      <p className={cn('text-white', 'text-body2e')}>{rank.name}</p>
      <RankBar
        height={heightPercentage}
        color={getRankColor(rank.rank)}
        rankText={rank.rank}
      />
    </div>
  );
};

export default TopRankListItem;
