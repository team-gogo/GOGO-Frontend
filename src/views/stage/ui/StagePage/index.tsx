'use client';

import { useRouter } from 'next/navigation';
import CreateButton from '@/shared/ui/createButton';
import { cn } from '@/shared/utils/cn';
import StageSection from '@/widgets/stage/ui/StageSection';
import getStageInfo from '../Mock/getStageInfo';

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
