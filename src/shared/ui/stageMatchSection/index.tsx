'use client';

import PasswordModal from '@/entities/stage/ui/PasswordModal';
import { LeftArrow, RightArrowIcon } from '@/shared/assets/svg';
import useStageNavigation from '@/shared/model/useStageNavigation';
import { usePasswordModalStore } from '@/shared/stores';
import { MatchResponse } from '@/shared/types/my/bet';
import { StagesType } from '@/shared/types/stage';
import { cn } from '@/shared/utils/cn';
import StageMatchContainer from '../stageMatchContainer';

interface StageSectionProps {
  title?: string;
  stages?: StagesType[];
  matches?: MatchResponse;
  isPending?: boolean;
}

const StageMatchSection = ({
  title,
  stages,
  matches,
  isPending,
}: StageSectionProps) => {
  const visibleCount = 2;

  const { isPasswordModalOpen, setIsPasswordModalOpen } =
    usePasswordModalStore();

  const totalStages = stages?.length ?? 0;
  const totalMatches = matches?.matches.length ?? 0;

  const {
    startIndex: stageStartIndex,
    handlePrev: handlePrevStage,
    handleNext: handleNextStage,
  } = useStageNavigation(totalStages, visibleCount);

  const {
    startIndex: matchStartIndex,
    handlePrev: handlePrevMatch,
    handleNext: handleNextMatch,
  } = useStageNavigation(totalMatches, visibleCount);

  return (
    <div
      className={cn(
        'flex',
        'h-full',
        'flex-col',
        totalStages >= 3 || totalMatches >= 3 ? 'w-[95%]' : 'w-full',
      )}
    >
      {title && (
        <h2
          className={cn('h-full', 'text-body1e', 'text-white', 'pb-[2.5rem]')}
        >
          {title}
        </h2>
      )}
      {isPending && (
        <div
          className={cn(
            'flex',
            'min-h-[18.25rem]',
            'justify-center',
            'items-center',
            'text-body1e',
            'text-white',
          )}
        >
          정보를 불러오는중...
        </div>
      )}
      {totalStages === 0 && !isPending && (
        <div
          className={cn(
            'flex',
            'min-h-[18.25rem]',
            'justify-center',
            'items-center',
            'text-body1e',
            'text-white',
          )}
        >
          해당하는 스테이지가 없습니다.
        </div>
      )}
      {totalStages > 0 && (
        <div
          className={cn(
            'relative',
            'h-full',
            'max-h-[18.25rem]',
            'flex w-full',
          )}
        >
          {stageStartIndex > 0 && (
            <button
              className={cn(
                'absolute left-[-4%] top-1/2 z-10 -translate-y-1/2',
              )}
              onClick={handlePrevStage}
            >
              <LeftArrow color="#6B6B6B" />
            </button>
          )}

          <StageMatchContainer
            stageInfo={{ stages: stages ?? [] }}
            matches={matches}
            startIndex={stageStartIndex}
          />

          {stageStartIndex < totalStages - visibleCount && (
            <button
              className={cn(
                'absolute right-[-4%] top-1/2 z-10 -translate-y-1/2',
              )}
              onClick={handleNextStage}
            >
              <RightArrowIcon size="2.5rem" />
            </button>
          )}
        </div>
      )}

      <div className={cn('relative flex w-full')}>
        {matchStartIndex > 0 && (
          <button
            className={cn('absolute left-[-4%] top-1/2 z-10 -translate-y-1/2')}
            onClick={handlePrevMatch}
          >
            <LeftArrow color="#6B6B6B" />
          </button>
        )}

        {totalMatches > 0 && (
          <StageMatchContainer
            stageInfo={{ stages: [] }}
            matches={matches}
            startIndex={matchStartIndex}
          />
        )}

        {matchStartIndex < totalMatches - visibleCount && (
          <button
            className={cn('absolute right-[-4%] top-1/2 z-10 -translate-y-1/2')}
            onClick={handleNextMatch}
          >
            <RightArrowIcon size="2.5rem" />
          </button>
        )}
      </div>

      {isPasswordModalOpen && (
        <PasswordModal onClose={() => setIsPasswordModalOpen(false)} />
      )}
    </div>
  );
};

export default StageMatchSection;
