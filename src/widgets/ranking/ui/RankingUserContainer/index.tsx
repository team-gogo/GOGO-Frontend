import React from 'react';
import { RankingUserItem } from '@/entities/ranking';
import { RankItem } from '@/shared/types/ranking';
import { cn } from '@/shared/utils/cn';

interface RankingUserContainerProps {
  remainingRanks: RankItem[];
}

const RankingUserContainer = ({
  remainingRanks,
}: RankingUserContainerProps) => {
  return (
    <div
      className={cn(
        'w-full',
        'rounded-lg',
        'flex',
        'flex-col',
        'gap-16',
        'items-center',
        'justify-center',
      )}
    >
      {remainingRanks.map((rank) => (
        <RankingUserItem key={rank.studentId} rank={rank} />
      ))}
    </div>
  );
};

export default RankingUserContainer;
