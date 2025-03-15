'use client';

import { DateContainer, MatchDetailModal } from '@/entities/main';
import { MatchClockIcon } from '@/shared/assets/svg';
import {
  CommunityIcon,
  MiniGameIcon,
  RankingIcon,
} from '@/shared/assets/svg/MainIcon';
import useMatchModalStore from '@/shared/stores/useMatchModalStore';
import StageMatchSection from '@/shared/ui/stageMatchSection';
import { cn } from '@/shared/utils/cn';
import { formatPoint } from '@/shared/utils/formatPoint';
import { CommunityItemContainer } from '@/widgets/community';
import { MiniGameSection, SectionWrapper } from '@/widgets/main';
import { RankingUserContainer } from '@/widgets/ranking';
import { getMatchInfo, getRankingMock } from '../..';

const MainPage = () => {
  const matchInfo = getMatchInfo();
  const rankingMock = getRankingMock();

  const isMainUsed = true;

  const { isMatchModalOpen, setIsMatchModalOpen } = useMatchModalStore();

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
        <SectionWrapper
          text={'미니게임'}
          icon={<MatchClockIcon />}
          path="/match"
        >
          <StageMatchSection matches={matchInfo} />
        </SectionWrapper>
        <div className={cn('flex', 'w-full', 'gap-[1.75rem]')}>
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
        <SectionWrapper
          text={'커뮤니티'}
          icon={<CommunityIcon />}
          path="/community"
        >
          <CommunityItemContainer isMainUsed={isMainUsed} />
        </SectionWrapper>
      </div>
      {isMatchModalOpen && (
        <MatchDetailModal onClose={() => setIsMatchModalOpen(false)} />
      )}
    </div>
  );
};

export default MainPage;
