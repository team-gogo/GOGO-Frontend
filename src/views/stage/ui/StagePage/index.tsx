'use client';

import { StagesType } from '@/shared/types/stage';
import { cn } from '@/shared/utils/cn';
import StageHeader from '@/widgets/stage/ui/StageHeader';
import StageSection from '@/widgets/stage/ui/StageSection';
import getStageInfo from '../Mock/getStageInfo';

const StagePage = () => {
  const stageInfo = getStageInfo();

  const participateStages: StagesType[] = [];
  const confirmedStages: StagesType[] = [];
  const recruitingStages: StagesType[] = [];

  stageInfo.stages.forEach((stage) => {
    if (stage.isParticipating) {
      participateStages.push(stage);
    }
    if (stage.status === 'CONFIRMED') {
      confirmedStages.push(stage);
    }
    if (stage.status === 'RECRUITING') {
      recruitingStages.push(stage);
    }
  });

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
