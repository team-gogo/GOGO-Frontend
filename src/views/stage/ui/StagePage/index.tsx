'use client';

import { useEffect } from 'react';
import { useStageAdminStore } from '@/shared/stores';
import { StagesType } from '@/shared/types/stage';
import StageMatchSection from '@/shared/ui/stageMatchSection';
import { cn } from '@/shared/utils/cn';
import StageHeader from '@/widgets/stage/ui/StageHeader';
import getStageInfo from '../Mock/getStageInfo';

const StagePage = () => {
  const stageInfo = getStageInfo();

  const { stageAdminArr, addStageAdmin } = useStageAdminStore();

  useEffect(() => {
    localStorage.setItem('stageAdminArr', JSON.stringify(stageAdminArr));
  }, [stageAdminArr]);

  const participateStages: StagesType[] = [];
  const confirmedStages: StagesType[] = [];
  const recruitingStages: StagesType[] = [];

  const maintainingStageIds: number[] = stageInfo.stages
    .filter((stage) => stage.isMaintaining)
    .map((stage) => stage.stageId);

  useEffect(() => {
    addStageAdmin(maintainingStageIds);
  }, []);

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

          <StageMatchSection stages={participateStages} />
          <StageMatchSection
            title="참여가능한 스테이지"
            stages={confirmedStages}
          />
          <StageMatchSection
            title="모집 중인 스테이지"
            stages={recruitingStages}
          />
        </div>
      </div>
    </div>
  );
};

export default StagePage;
