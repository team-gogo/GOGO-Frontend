import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { RightArrowIcon } from '@/shared/assets/svg';
import { SportType } from '@/shared/model/sportTypes';
import { useMatchBatchArrStore, useMatchNoticeStore } from '@/shared/stores';
import { MatchResponse } from '@/shared/types/my/bet';
import Match from '@/shared/ui/match';
import { cn } from '@/shared/utils/cn';

interface MatchContainerProps {
  matchInfo: MatchResponse | undefined;
  isMyBetInfo?: boolean;
  selectedSport?: SportType | null;
  isPending: boolean;
}

const MatchContainer = ({
  matchInfo,
  isMyBetInfo = false,
  selectedSport,
  isPending,
}: MatchContainerProps) => {
  const { push } = useRouter();

  const params = useParams<{ stageId: string }>();

  const { stageId } = params;

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
        <h2 className={cn('midpad:text-body1e', 'text-body3e', 'text-white')}>
          내가 베팅한 매치
        </h2>
      )}

      {isPending ? (
        <div
          className={cn(
            'flex',
            'w-full',
            'h-full',
            'items-center',
            'justify-center',
            'pt-[10rem]',
          )}
        >
          <div
            className={cn('flex', 'flex-col', 'items-center', 'gap-[1.5ren]')}
          >
            <h2 className={cn('midpad:text-h4e', 'text-body1e', 'text-white')}>
              정보를 불러오는 중 입니다.
            </h2>
          </div>
        </div>
      ) : filteredMatches && filteredMatches.length > 0 ? (
        <div
          className={cn(
            'grid',
            'tablet:grid-cols-2',
            'gap-x-[2rem]',
            'gap-y-[2.5rem]',
            'grid-cols-1',
          )}
        >
          {filteredMatches.map((match) => (
            <Match key={match.matchId} match={match} />
          ))}
        </div>
      ) : (
        <div
          className={cn(
            'flex',
            'w-full',
            'h-full',
            'items-center',
            'justify-center',
            'pt-[10rem]',
          )}
        >
          <div
            className={cn('flex', 'flex-col', 'items-center', 'gap-[1.5ren]')}
          >
            <h2 className={cn('midpad:text-h4e', 'text-body1e', 'text-white')}>
              {isMyBetInfo
                ? '현재 베팅한 매치가 없습니다.'
                : '해당하는 매치가 없습니다.'}
            </h2>
            {isMyBetInfo && (
              <button
                onClick={() => push(`/main/${stageId}`)}
                className={cn(
                  'flex',
                  'items-center',
                  'midpad:gap-[1rem]',
                  'gap-[0.5rem]',
                )}
              >
                <p
                  className={cn(
                    'midpad:text-body1e',
                    'text-body3e',
                    'text-gray-500',
                  )}
                >
                  베팅 하러가기
                </p>
                <RightArrowIcon />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchContainer;
