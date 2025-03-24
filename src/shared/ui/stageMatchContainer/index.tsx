'use client';

import { useEffect } from 'react';
import { useMatchBatchArrStore } from '@/shared/stores';
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
  const visibleCount = 2;

  const { matchBatchArr, setMatchBatchArr } = useMatchBatchArrStore();

  useEffect(() => {
    if (matches?.matches && matchBatchArr.length === 0) {
      setMatchBatchArr(
        matches.matches.map(({ matchId, isEnd }) => ({ matchId, isEnd })),
      );
    }
  }, [matches, matchBatchArr]);

  return (
    <div
      className={cn(
        'w-full',
        'h-full',
        'flex',
        'justify-center',
        'itmes-center',
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
              startIndex * 20
            }px))`,
          }}
        >
          {stageInfo.stages?.map((stage) => (
            <div
              key={stage.stageId}
              className="w-[calc(50%-20px)] flex-shrink-0"
            >
              <Stage stage={stage} />
            </div>
          ))}

          {matches?.matches.map((match) => (
            <div
              key={match.matchId}
              className="w-[calc(50%-20px)] flex-shrink-0"
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
