'use client';

import { DateContainer, MatchDetailModal } from '@/entities/main';
import BatchModal from '@/entities/main/ui/BatchModal';
import useSelectSport from '@/shared/model/useSelectSport';
import { useBatchModalStore, useMatchModalStore } from '@/shared/stores';
import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import { getMatchInfo } from '@/views/main';
import { MatchContainer } from '@/widgets/my';
import { MatchFilterHeader } from '@/widgets/stage/apply';

const MatchPage = () => {
  const matchInfo = getMatchInfo();

  const { selectedSport, toggleSportSelection } = useSelectSport();

  const { isMatchModalOpen, setIsMatchModalOpen } = useMatchModalStore();
  const { isBatchModalOpen, setIsBatchModalOpen } = useBatchModalStore();

  return (
    <div
      className={cn(
        'flex',
        'w-full',
        'flex-col',
        'items-center',
        'justify-center',
        'py-[3.75rem]',
        'px-[1rem]',
      )}
    >
      <div
        className={cn(
          'flex',
          'flex-col',
          'w-full',
          'max-w-[82.5rem]',
          'gap-[2.5rem]',
        )}
      >
        <BackPageButton />
        <div className={cn('flex', 'flex-col', 'w-full', 'gap-[1.6875rem]')}>
          <div
            className={cn('flex', 'w-full', 'justify-between', 'items-center')}
          >
            <MatchFilterHeader
              selectedSport={selectedSport}
              toggleSportSelection={toggleSportSelection}
            />
            <DateContainer />
          </div>
          <MatchContainer matchInfo={matchInfo} selectedSport={selectedSport} />
        </div>
      </div>
      {isMatchModalOpen && (
        <MatchDetailModal onClose={() => setIsMatchModalOpen(false)} />
      )}
      {isBatchModalOpen && (
        <BatchModal onClose={() => setIsBatchModalOpen(false)} />
      )}
    </div>
  );
};

export default MatchPage;
