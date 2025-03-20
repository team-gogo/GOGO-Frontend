'use client';

import { MatchDetailModal } from '@/entities/main';
import BatchModal from '@/entities/main/ui/BatchModal';
import { useBatchModalStore, useMatchModalStore } from '@/shared/stores';
import { cn } from '@/shared/utils/cn';
import {
  MatchContainer,
  PointContainer,
  TotalPointContainer,
} from '@/widgets/my/bet';
import getMatchResponse from '../Mock/getMatchResponse';
import getTempPoint from '../Mock/getTempPoint';

const MyBetPage = () => {
  const userBetInfo = getMatchResponse();
  const tempPoint = getTempPoint();

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
          'gap-[3.75rem]',
        )}
      >
        <div className={cn('w-full', 'flex', 'flex-col', 'gap-[1.5rem]')}>
          <TotalPointContainer point={900000} />
          <PointContainer tempPoint={tempPoint} />
        </div>
        <MatchContainer matchInfo={userBetInfo} isMyBetInfo={true} />
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

export default MyBetPage;
