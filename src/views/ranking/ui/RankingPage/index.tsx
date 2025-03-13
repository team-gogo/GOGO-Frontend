import React from 'react';
import { RankingData, RankItem } from '@/shared/types/ranking';
import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import { RankingUserContainer, TopRankListContainer } from '@/widgets/ranking';
import { getRankingMock } from '../../Mock/getRankingMock';

const RankingPage = () => {
  const rankingData: RankingData = getRankingMock();
  const topThreeRanks: RankItem[] = rankingData.rank.slice(0, 3);

  const reorderedTopThreeRanks: RankItem[] = [
    topThreeRanks[1],
    topThreeRanks[0],
    topThreeRanks[2],
  ];

  return (
    <div
      className={cn(
        'w-full',
        'max-w-[82.5rem]',
        'flex',
        'flex-col',
        'space-y-[3rem]',
      )}
    >
      <BackPageButton label="포인트 랭킹" type="back" />
      <div className={cn('space-y-[2.25rem]')}>
        <TopRankListContainer topRanks={reorderedTopThreeRanks} />
        <RankingUserContainer remainingRanks={rankingData.rank} />
      </div>
    </div>
  );
};

export default RankingPage;
