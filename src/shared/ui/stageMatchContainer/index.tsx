'use client';

import { useEffect, useState } from 'react';
import { useMatchBatchArrStore, useMatchNoticeStore } from '@/shared/stores';
import { MyStageResponse } from '@/shared/types/my';
import { MatchResponse } from '@/shared/types/my/bet';
import { StageResponse } from '@/shared/types/stage';
import { cn } from '@/shared/utils/cn';
import Match from '../match';
import Stage from '../stage';

interface StageContainerProps {
  stageInfo: MyStageResponse | StageResponse;
  matches?: MatchResponse;
  startIndex: number;
}

const StageMatchContainer = ({
  stageInfo,
  matches,
  startIndex,
}: StageContainerProps) => {
  const [visibleCount, setVisibleCount] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(window.innerWidth <= 768 ? 1 : 2);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { setMatchBatchArr } = useMatchBatchArrStore();
  const { setMatchNoticeArr } = useMatchNoticeStore();

  useEffect(() => {
    if (matches?.matches) {
      setMatchBatchArr(
        matches.matches.map(({ matchId, isEnd }) => ({ matchId, isEnd })),
      );
      setMatchNoticeArr(
        matches.matches.map(({ matchId, isNotice }) => ({ matchId, isNotice })),
      );
    }
  }, [matches]);

  return (
    <div
      className={cn(
        'w-full',
        'h-full',
        'flex',
        'justify-center',
        'items-center',
      )}
    >
      <div className={cn('relative', 'w-full', 'overflow-hidden')}>
        <div
          className={cn(
            'flex',
            'gap-[2.5rem]',
            'transition-transform',
            'duration-300',
          )}
          style={{
            transform: `translateX(calc(-${startIndex * (100 / visibleCount)}% - ${
              visibleCount === 1 ? startIndex * 40 : startIndex * 20
            }px))`,
          }}
        >
          {stageInfo.stages?.map((stage) => (
            <div
              key={stage.stageId}
              className={cn(
                'flex',
                'midpad:w-[calc(50%-20px)]',
                'w-full',
                'shrink-0',
                'justify-center',
                'items-center',
              )}
            >
              <Stage stage={stage} />
            </div>
          ))}

          {matches?.matches
            .slice()
            .sort((a, b) => {
              if (a.isEnd === b.isEnd) {
                return (
                  new Date(a.startDate).getTime() -
                  new Date(b.startDate).getTime()
                );
              }
              return a.isEnd ? 1 : -1;
            })
            .map((match) => (
              <div
                key={match.matchId}
                className={cn(
                  'flex',
                  'midpad:w-[calc(50%-20px)]',
                  'w-full',
                  'shrink-0',
                  'justify-center',
                )}
              >
                <Match match={match} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default StageMatchContainer;
