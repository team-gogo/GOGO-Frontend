'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { BettingModal } from '@/entities/main';
import BatchCancelModal from '@/entities/main/ui/BatchCancelModal';
import BatchModal from '@/entities/main/ui/BatchModal';
import {
  useBatchModalStore,
  useCheckAgainModalStore,
  useMatchModalStore,
  usePointStore,
} from '@/shared/stores';
import { cn } from '@/shared/utils/cn';
import { useGetUserStagePoint } from '@/views/main/model/useGetUserStagePoint';
import { useGetMyBettingMatch } from '@/views/my/model/useGetMyBettingMatch';
import { useGetMyTempPoint } from '@/views/my/model/useGetMyTempPoint';
import {
  MatchContainer,
  PointContainer,
  TotalPointContainer,
} from '@/widgets/my/bet';

const MyBetPage = () => {
  const searchParams = useSearchParams();

  const stageId = searchParams.get('stageId');

  const { data: userPointData } = useGetUserStagePoint(Number(stageId));
  const { data: myMatchData } = useGetMyBettingMatch(Number(stageId));
  const { data: myTempPoint } = useGetMyTempPoint(Number(stageId));

  const { point, setPoint } = usePointStore();

  useEffect(() => {
    if (userPointData?.point) {
      setPoint(userPointData.point);
    }
  }, [userPointData]);

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
          'gap-[3.75rem]',
        )}
      >
        <div className={cn('w-full', 'flex', 'flex-col', 'gap-[1.5rem]')}>
          <TotalPointContainer point={point} />
          <PointContainer tempPoint={myTempPoint} />
        </div>
        <MatchContainer matchInfo={myMatchData} isMyBetInfo={true} />
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

export default MyBetPage;
