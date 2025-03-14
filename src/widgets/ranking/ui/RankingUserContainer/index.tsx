import React from 'react';
import { RankingUserItem } from '@/entities/ranking';
import { RankItem } from '@/shared/types/ranking';
import { cn } from '@/shared/utils/cn';

interface RankingUserContainerProps {
  remainingRanks: RankItem[];
  isMainUsed?: boolean;
}

const RankingUserContainer = ({
  remainingRanks,
  isMainUsed = false,
}: RankingUserContainerProps) => {
  const ranksToDisplay = isMainUsed
    ? remainingRanks.slice(0, 4)
    : remainingRanks;

  return (
    <div
      className={cn(
        'w-full',
        'rounded-lg',
        'flex',
        'flex-col',
        isMainUsed ? 'gap-[0.75rem]' : 'gap-16',
        'items-center',
        'justify-center',
      )}
    >
      {ranksToDisplay.map((rank) => (
        <RankingUserItem
          key={rank.studentId}
          rank={rank}
          isMainUsed={isMainUsed}
        />
      ))}
    </div>
  );
};

export default RankingUserContainer;
