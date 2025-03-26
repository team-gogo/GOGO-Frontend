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
import { getBoardMock, getMatchInfo, getRankingMock } from '../..';
import { useGetUserStagePoint } from '../../model/useGetUserStagePoint';
import getStageInMatch from '../Mock/getStageInMatch';

const MainPage = () => {
  const matchInfo = getMatchInfo();
  const rankingMock = getRankingMock();
  const boardMock = getBoardMock();
  const stageInMatch = getStageInMatch();
  const slicedBoardMock = boardMock.board.slice(0, 4);

  const { stageId } = useParams();

  const { data: userPointData } = useGetUserStagePoint(Number(stageId));

  const { point, setPoint } = usePointStore();

  useEffect(() => {
    if (userPointData?.point) {
      setPoint(userPointData.point);
    }
  }, [userPointData]);

  useEffect(() => {
    console.log(point);
  }, [point]);

  const { setStageId } = useMyStageIdStore();

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
            <h2 className={cn('text-h3e', 'text-white')}>{formatPoint(900)}</h2>
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
            text={'미니게임'}
            icon={<MatchClockIcon />}
            path="/match"
          >
            <StageMatchSection matches={matchInfo} />
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
              path="/mini-game"
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
              path="/community"
            >
              <CommunityItemContainer
                isMainUsed={isMainUsed}
                boardData={{
                  info: boardMock.info,
                  board: slicedBoardMock,
                }}
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
