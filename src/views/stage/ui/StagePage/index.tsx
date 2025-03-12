'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PasswordModal from '@/entities/stage/ui/PasswordModal';
import { LeftArrow, RightArrowIcon } from '@/shared/assets/svg';
import { StagesType } from '@/shared/types/stage';
import CreateButton from '@/shared/ui/createButton';
import StageContainer from '@/shared/ui/stageContainer';
import { cn } from '@/shared/utils/cn';
import getStageInfo from '../Mock/getStageInfo';

const StageSection = ({
  title,
  stages,
}: {
  title?: string;
  stages: StagesType[];
}) => {
  const visibleCount = 2;
  const [startIndex, setStartIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handlePrev = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev + 1 <= stages.length - visibleCount ? prev + 1 : prev,
    );
  };

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

const StagePage = () => {
  const { push } = useRouter();
  const stageInfo = getStageInfo();

  const participateStages = stageInfo.stages.filter(
    (stage) => stage.isParticipating,
  );
  const confirmedStages = stageInfo.stages.filter(
    (stage) => stage.status === 'CONFIRMED',
  );
  const recruitingStages = stageInfo.stages.filter(
    (stage) => stage.status === 'RECRUITING',
  );

  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-center gap-[2.5rem] px-[1rem] py-[3.75rem]',
      )}
    >
      <div className={cn('flex w-full max-w-[82.5rem] flex-col gap-[4rem]')}>
        <div className={cn('flex flex-col gap-[2.5rem]')}>
          <div className={cn('flex w-full items-center justify-between')}>
            <h1 className={cn('text-body1e text-white')}>참여하는 스테이지</h1>
            <div className={cn('flex items-center gap-[1.5rem]')}>
              <CreateButton onClick={() => push('/stage/create/fast')}>
                빠른 경기 생성
              </CreateButton>
              <CreateButton onClick={() => push('/stage/create/official')}>
                학교 공식 행사 생성
              </CreateButton>
            </div>
          </div>

          <StageSection stages={participateStages} />
          <StageSection title="참여가능한 스테이지" stages={confirmedStages} />
          <StageSection title="모집 중인 스테이지" stages={recruitingStages} />
        </div>
      </div>
    </div>
  );
};

export default StagePage;
