import { useEffect } from 'react';
import { SportType } from '@/shared/model/sportTypes';
import { useMatchBatchArrStore, useMatchNoticeStore } from '@/shared/stores';
import { MatchResponse } from '@/shared/types/my/bet';
import Match from '@/shared/ui/match';
import { cn } from '@/shared/utils/cn';

interface MatchContainerProps {
  matchInfo: MatchResponse | undefined;
  isMyBetInfo?: boolean;
  selectedSport?: SportType | null;
}

const MatchContainer = ({
  matchInfo,
  isMyBetInfo = false,
  selectedSport,
}: MatchContainerProps) => {
  const { setMatchBatchArr } = useMatchBatchArrStore();
  const { setMatchNoticeArr } = useMatchNoticeStore();

  const filteredMatches = selectedSport
    ? matchInfo?.matches.filter((match) =>
        match.category?.includes(selectedSport),
      )
    : matchInfo?.matches;

  useEffect(() => {
    if (matchInfo?.matches) {
      setMatchBatchArr(
        matchInfo.matches.map(({ matchId, isEnd }) => ({ matchId, isEnd })),
      );
      setMatchNoticeArr(
        matchInfo.matches.map(({ matchId, isNotice }) => ({
          matchId,
          isNotice,
        })),
      );
    }
  }, [matchInfo]);

  return (
    <div className={cn('w-full', 'flex', 'flex-col', 'gap-[1.5rem]')}>
      {isMyBetInfo && (
        <h2 className={cn('text-body1e', 'text-white')}>내가 참여한 매치</h2>
      )}
      <div
        className={cn(
          'grid',
          'tablet:grid-cols-2',
          'gap-x-[2rem]',
          'gap-y-[2.5rem]',
          'grid-cols-1',
        )}
      >
        {filteredMatches?.map((match) => (
          <Match key={match.matchId} match={match} />
        ))}
      </div>
    </div>
  );
};

export default MatchContainer;
