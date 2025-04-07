'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
// import { toast } from 'react-toastify';
import { useGetStageGameQuery } from '@/entities/community/model/useGetStageGameQuery';
import { DateContainer, BettingModal } from '@/entities/main';
// import { useGetIsWasted } from '@/entities/main/model/useGetIsWasted';
import BatchCancelModal from '@/entities/main/ui/BatchCancelModal';
import BatchModal from '@/entities/main/ui/BatchModal';
// import WastedModal from '@/entities/main/ui/WastedModal';
import { MatchClockIcon } from '@/shared/assets/svg';
import {
  CommunityIcon,
  MiniGameIcon,
  PriceIcon,
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
// import useWastedModalStore from '@/shared/stores/useWastedModalStore';
import StageMatchSection from '@/shared/ui/stageMatchSection';
import { cn } from '@/shared/utils/cn';
import { formatPoint } from '@/shared/utils/formatPoint';
import { useGetActiveGameQuery } from '@/views/mini-game/model/useGetActiveGameQuery';
import { useGetRankingQuery } from '@/views/ranking/model/useGetRankingQuery';
import { CommunityItemContainer } from '@/widgets/community';
import {
  MatchListSection,
  MiniGameSection,
  SectionWrapper,
} from '@/widgets/main';
import { RankingUserContainer } from '@/widgets/ranking';
import { useGetSearchMatch } from '../../model/useGetSearchMatch';
import { useGetUserStagePoint } from '../../model/useGetUserStagePoint';

const MainPage = () => {
  const params = useParams<{ stageId: string }>();
  const { stageId } = params;

  const { setStageId } = useMyStageIdStore();
  const { point, setPoint } = usePointStore();
  const { selectDate, setSelectDate } = useSelectDateStore();

  const { data: userPointData } = useGetUserStagePoint(Number(stageId));

  useEffect(() => {
    if (userPointData?.point) {
      setPoint(userPointData.point);
    }
  }, [userPointData]);

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

  const { data: rankingData } = useGetRankingQuery(stageId);

  const { data: activeGameList } = useGetActiveGameQuery(stageId);

  const { data: gameData } = useGetStageGameQuery(stageId);

  const rankItem = rankingData?.rank || [];

  useEffect(() => {
    setStageId(Number(stageId));
  }, []);

  const isMainUsed = true;

  const { isMatchModalOpen, setIsMatchModalOpen } = useMatchModalStore();
  const { isBatchModalOpen, setIsBatchModalOpen } = useBatchModalStore();
  const { isCheckAgainModalOpen, setIsCheckAgainModalOpen } =
    useCheckAgainModalStore();
  // const { isWastedModalOpen, setIsWastedModalOpen } = useWastedModalStore();

  // const { data: isWastedData, error: isWastedError } = useGetIsWasted(
  //   Number(stageId),
  // );

  // useEffect(() => {
  //   if (isWastedData?.isWasted === false) {
  //     setIsWastedModalOpen(true);
  //   }
  // }, [isWastedData]);

  // if (isWastedError) {
  //   toast.error('파산 조회를 실패했습니다');
  // }

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
            <h3 className={cn('text-body1s', 'text-gray-200')}>
              ({point.toLocaleString()})
            </h3>
          </div>
          <DateContainer />
        </div>
        <div className={cn('flex', 'w-full', 'flex-wrap', 'gap-[1.75rem]')}>
          <SectionWrapper
            text={isToday ? '오늘 최신 매치' : `${selectDate.slice(5)} 매치`}
            icon={<MatchClockIcon />}
            path={`/match/list/${stageId}`}
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
              'flex-wrap',
              'tablet:flex-nowrap',
              'min-h-[15.5rem]',
            )}
          >
            <SectionWrapper
              text={'미니게임'}
              icon={<MiniGameIcon />}
              path={`/mini-game/${stageId}`}
            >
              <MiniGameSection
                stageId={stageId}
                activeGameList={activeGameList}
              />
            </SectionWrapper>
            <SectionWrapper
              text={'포인트 랭킹'}
              icon={<PriceIcon />}
              path={`/ranking/${stageId}`}
            >
              <div
                className={cn('flex', 'w-full', 'flex-col', 'justify-between')}
              >
                <RankingUserContainer
                  remainingRanks={rankItem}
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
              'flex-wrap',
              'tablet:flex-nowrap',
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
              path={`/match/team/${stageId}`}
            >
              <MatchListSection stageInMatch={gameData} stageId={stageId} />
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
      {/* {isWastedModalOpen === false && (
        <WastedModal onClose={() => setIsWastedModalOpen(false)} />
      )} */}
    </div>
  );
};

export default MainPage;
