'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { DateContainer, BettingModal } from '@/entities/main';
import BatchCancelModal from '@/entities/main/ui/BatchCancelModal';
import BatchModal from '@/entities/main/ui/BatchModal';
import useSelectSport from '@/shared/model/useSelectSport';
import {
  useBatchModalStore,
  useCheckAgainModalStore,
  useMatchModalStore,
  useSelectDateStore,
} from '@/shared/stores';
import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import { useGetSearchMatch } from '@/views/main/model/useGetSearchMatch';
import { MatchContainer } from '@/widgets/my';
import { MatchFilterHeader } from '@/widgets/stage/apply';

const MatchPage = () => {
  const params = useParams<{ stageId: string }>();
  const { stageId } = params;

  const { selectedSport, toggleSportSelection } = useSelectSport();

  const { isMatchModalOpen, setIsMatchModalOpen } = useMatchModalStore();
  const { isBatchModalOpen, setIsBatchModalOpen } = useBatchModalStore();
  const { isCheckAgainModalOpen, setIsCheckAgainModalOpen } =
    useCheckAgainModalStore();
  const { selectDate, setSelectDate } = useSelectDateStore();

  useEffect(() => {
    setSelectDate('');
  }, [stageId]);

  const today = new Date();

  const [year, month, day] = selectDate
    ? selectDate.split('-').map(Number)
    : [today.getFullYear(), today.getMonth() + 1, today.getDate()];

  const { data: searchMatchData, isPending: matchPending } = useGetSearchMatch(
    Number(stageId),
    year,
    month,
    day,
  );

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
          <MatchContainer
            matchInfo={searchMatchData}
            selectedSport={selectedSport}
            isPending={matchPending}
          />
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
