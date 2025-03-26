'use client';

import { useEffect } from 'react';
import { useStageAdminStore } from '@/shared/stores';
import { StagesType } from '@/shared/types/stage';
import StageMatchSection from '@/shared/ui/stageMatchSection';
import { cn } from '@/shared/utils/cn';
import StageHeader from '@/widgets/stage/ui/StageHeader';
// import getStageInfo from '../Mock/getStageInfo';
import { useGetStageList } from '../model/useGetStageList';

const StagePage = () => {
  // const stageInfo = getStageInfo();
  const {
    data: stageListInfo,
    refetch: stageListRefetch,
    isPending,
  } = useGetStageList();
  const { stageAdminArr, addStageAdmin } = useStageAdminStore();

  useEffect(() => {
    stageListRefetch();
  }, []);

  useEffect(() => {
    localStorage.setItem('stageAdminArr', JSON.stringify(stageAdminArr));
  }, [stageAdminArr]);

  const participateStages: StagesType[] = [];
  const confirmedStages: StagesType[] = [];
  const recruitingStages: StagesType[] = [];

  const maintainingStageIds: number[] =
    stageListInfo?.stages
      .filter((stage) => stage.isMaintainer)
      .map((stage) => stage.stageId) || [];

  useEffect(() => {
    if (maintainingStageIds.length > 0) {
      addStageAdmin(maintainingStageIds);
    }
  }, [maintainingStageIds, addStageAdmin]);

  stageListInfo?.stages.forEach((stage) => {
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
        'flex min-h-screen w-full flex-col items-center justify-center gap-[2.5rem] px-[1rem] py-[3.75rem]',
      )}
    >
      <div
        className={cn(
          'flex min-h-screen w-full max-w-[82.5rem] flex-col gap-[4rem]',
        )}
      >
        <div
          className={cn(
            'flex h-full flex-col items-center justify-center gap-[2.5rem]',
          )}
        >
          <StageHeader />

          <StageMatchSection stages={participateStages} isPending={isPending} />
          <StageMatchSection
            title="참여가능한 스테이지"
            stages={confirmedStages}
            isPending={isPending}
          />
          <StageMatchSection
            title="모집 중인 스테이지"
            stages={recruitingStages}
            isPending={isPending}
          />
        </div>
      </div>
    </div>
  );
};

export default StagePage;
