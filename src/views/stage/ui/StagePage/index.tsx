'use client';

import { cn } from '@/shared/utils/cn';
import StageHeader from '@/widgets/stage/ui/StageHeader';
import StageSection from '@/widgets/stage/ui/StageSection';
import getStageInfo from '../Mock/getStageInfo';

const StagePage = () => {
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
          <StageHeader />

          <StageSection stages={participateStages} />
          <StageSection title="참여가능한 스테이지" stages={confirmedStages} />
          <StageSection title="모집 중인 스테이지" stages={recruitingStages} />
        </div>
      </div>
    </div>
  );
};

export default StagePage;
