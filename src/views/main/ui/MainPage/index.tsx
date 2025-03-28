'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { DateContainer, BettingModal } from '@/entities/main';
import BatchCancelModal from '@/entities/main/ui/BatchCancelModal';
import BatchModal from '@/entities/main/ui/BatchModal';
import { MatchClockIcon } from '@/shared/assets/svg';
import {
  CommunityIcon,
  MiniGameIcon,
  RankingIcon,
} from '@/shared/assets/svg/MainIcon';

import {
  useBatchModalStore,
  useCheckAgainModalStore,
  useMyStageIdStore,
  usePointStore,
  useSelectDateStore,
} from '@/shared/stores';
import useMatchModalStore from '@/shared/stores/useMatchModalStore';
import StageMatchSection from '@/shared/ui/stageMatchSection';
import { cn } from '@/shared/utils/cn';
import { formatPoint } from '@/shared/utils/formatPoint';
import { CommunityItemContainer } from '@/widgets/community';
import {
  MatchListSection,
  MiniGameSection,
  SectionWrapper,
} from '@/widgets/main';
import { RankingUserContainer } from '@/widgets/ranking';

import { getRankingMock } from '../..';
import { useGetSearchMatch } from '../../model/useGetSearchMatch';
import { useGetUserStagePoint } from '../../model/useGetUserStagePoint';

import getStageInMatch from '../Mock/getStageInMatch';

const MainPage = () => {
  const rankingMock = getRankingMock();
  const stageInMatch = getStageInMatch();

  const params = useParams<{ stageId: string }>();
  const { stageId } = params;

  const { data: userPointData } = useGetUserStagePoint(Number(stageId));

  const { point, setPoint } = usePointStore();

  useEffect(() => {
    if (userPointData?.point) {
      setPoint(userPointData.point);
    }
  }, [userPointData]);

  const { setStageId } = useMyStageIdStore();
  const { selectDate, setSelectDate } = useSelectDateStore();

  useEffect(() => {
    setStageId(Number(stageId));
    setSelectDate('');
  }, [stageId]);

  const today = new Date();
  const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const isToday = selectDate === '' || selectDate === formattedToday;

  const [year, month, day] = selectDate
    ? selectDate.split('-').map(Number)
    : [today.getFullYear(), today.getMonth() + 1, today.getDate()];

  const { data: searchMatchData, isPending: searchMatchPending } =
    useGetSearchMatch(Number(stageId), year, month, day);

  useEffect(() => {
    setStageId(Number(stageId));
  }, []);

  const isMainUsed = true;

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
        <div className={cn('w-full', 'flex', 'justify-between')}>
          <div className={cn('flex', 'items-center', 'gap-[1rem]', 'w-full')}>
            <h2 className={cn('text-title4s', 'text-gray-500')}>포인트</h2>
            <h2 className={cn('text-h3e', 'text-white')}>
              {formatPoint(point)}
            </h2>
          </div>
          <DateContainer />
        </div>
        <div
          className={cn(
            'flex',
            'w-full',
            'flex-wrap',
            'gap-[1.75rem]',
            'md:flex-col',
          )}
        >
          <SectionWrapper
            text={isToday ? '오늘 최신 매치' : `${selectDate.slice(5)} 매치`}
            icon={<MatchClockIcon />}
            path="/match"
          >
            <StageMatchSection
              matches={searchMatchData}
              isPending={searchMatchPending}
            />
          </SectionWrapper>
          <div
            className={cn(
              'flex',
              'w-full',
              'gap-[1.75rem]',
              'tablet:flex-wrap',
            )}
          >
            <SectionWrapper
              text={'미니게임'}
              icon={<MiniGameIcon />}
              path={`/mini-game/${stageId}`}
            >
              <MiniGameSection />
            </SectionWrapper>
            <SectionWrapper
              text={'포인트 랭킹'}
              icon={<RankingIcon />}
              path="/ranking"
            >
              <div
                className={cn('flex', 'w-full', 'flex-col', 'justify-between')}
              >
                <RankingUserContainer
                  remainingRanks={rankingMock.rank}
                  isMainUsed={isMainUsed}
                />
              </div>
            </SectionWrapper>
          </div>

          <div
            className={cn(
              'w-full',
              'flex',
              'gap-[1.75rem]',
              'tablet:flex-wrap',
            )}
          >
            <SectionWrapper
              text={'커뮤니티'}
              icon={<CommunityIcon />}
              path={`/community/${stageId}`}
            >
              <CommunityItemContainer
                stageId={stageId}
                isMainUsed={isMainUsed}
                currentPage={1}
              />
            </SectionWrapper>

            <SectionWrapper
              text={'경기'}
              icon={<RankingIcon />}
              path="/match/team"
            >
              <MatchListSection stageInMatch={stageInMatch} />
            </SectionWrapper>
          </div>
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

export default MainPage;
