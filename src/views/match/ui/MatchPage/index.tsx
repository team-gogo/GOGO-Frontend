'use client';

import { DateContainer, BettingModal } from '@/entities/main';
import BatchCancelModal from '@/entities/main/ui/BatchCancelModal';
import BatchModal from '@/entities/main/ui/BatchModal';
import useSelectSport from '@/shared/model/useSelectSport';
import {
  useBatchModalStore,
  useCheckAgainModalStore,
  useMatchModalStore,
} from '@/shared/stores';
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
  const { isCheckAgainModalOpen, setIsCheckAgainModalOpen } =
    useCheckAgainModalStore();

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
        <BettingModal onClose={() => setIsMatchModalOpen(false)} />
      )}
      {isBatchModalOpen && (
        <BatchModal onClose={() => setIsBatchModalOpen(false)} />
      )}
      {isCheckAgainModalOpen && (
        <BatchCancelModal onClose={() => setIsCheckAgainModalOpen(false)} />
      )}
    </div>
  );
};

export default MatchPage;
