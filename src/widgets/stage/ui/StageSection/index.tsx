'use client';

import { useState } from 'react';
import PasswordModal from '@/entities/stage/ui/PasswordModal';
import { LeftArrow, RightArrowIcon } from '@/shared/assets/svg';
import useStageNavigation from '@/shared/model/useStageNavigation';
import { StagesType } from '@/shared/types/stage';
import StageContainer from '@/shared/ui/stageContainer';
import { cn } from '@/shared/utils/cn';

const StageSection = ({
  title,
  stages,
}: {
  title?: string;
  stages: StagesType[];
}) => {
  const visibleCount = 2;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { startIndex, handlePrev, handleNext } = useStageNavigation(
    stages.length,
    visibleCount,
  );

  return (
    <div className={cn('flex flex-col gap-[2.5rem]')}>
      {title && <h2 className={cn('text-body1e text-white')}>{title}</h2>}
      <div className={cn('relative flex w-full')}>
        {startIndex > 0 && (
          <button
            className={cn('absolute left-[-4%] top-1/2 z-10 -translate-y-1/2')}
            onClick={handlePrev}
          >
            <LeftArrow color="#6B6B6B" />
          </button>
        )}
        <StageContainer
          stageInfo={{ stages }}
          startIndex={startIndex}
          setIsModalOpen={setIsModalOpen}
        />
        {startIndex < stages.length - visibleCount && (
          <button
            className={cn('absolute right-[-4%] top-1/2 z-10 -translate-y-1/2')}
            onClick={handleNext}
          >
            <RightArrowIcon size="2.5rem" />
          </button>
        )}
      </div>
      {isModalOpen && <PasswordModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default StageSection;
