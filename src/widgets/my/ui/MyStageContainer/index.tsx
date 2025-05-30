'use client';

import { useRouter } from 'next/navigation';
import { RightArrowIcon } from '@/shared/assets/svg';
import { MyStageResponse } from '@/shared/types/my';
import Stage from '@/shared/ui/stage';
import { cn } from '@/shared/utils/cn';

interface MyStageContainerProps {
  myStageInfo?: MyStageResponse;
  isPending: boolean;
}

const MyStageContainer = ({
  myStageInfo,
  isPending,
}: MyStageContainerProps) => {
  const { push } = useRouter();
  return (
    <div className={cn('w-full', 'h-full', 'flex', 'flex-col', 'gap-[1.5rem]')}>
      <h2 className={cn('midpad:text-body1e', 'text-body3e', 'text-white')}>
        내가 참여한 스테이지
      </h2>

      {isPending && (
        <div
          className={cn(
            'flex',
            'w-full',
            'h-full',
            'items-center',
            'justify-center',
            'pt-[10rem]',
          )}
        >
          <div
            className={cn('flex', 'flex-col', 'items-center', 'gap-[1.5ren]')}
          >
            <h2 className={cn('midpad:text-h4e', 'text-body1e', 'text-white')}>
              정보를 불러오는 중 입니다.
            </h2>
          </div>
        </div>
      )}

      {myStageInfo?.stages.length === 0 && !isPending ? (
        <div
          className={cn(
            'flex',
            'w-full',
            'h-full',
            'items-center',
            'justify-center',
            'pt-[10rem]',
          )}
        >
          <div
            className={cn('flex', 'flex-col', 'items-center', 'gap-[1.5ren]')}
          >
            <h2 className={cn('midpad:text-h4e', 'text-body1e', 'text-white')}>
              현재 참여한 스테이지가 없습니다.
            </h2>
            <button
              onClick={() => push('/stage')}
              className={cn(
                'flex',
                'items-center',
                'midpad:gap-[1rem]',
                'gap-[0.5rem]',
              )}
            >
              <p
                className={cn(
                  'midpad:text-body1e',
                  'text-body3e',
                  'text-gray-500',
                )}
              >
                스테이지 참여하러가기
              </p>
              <RightArrowIcon />
            </button>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            'grid',
            'pad:grid-cols-2',
            'tablet:gap-x-[2.5rem]',
            'gap-x-[1rem]',
            'tablet:gap-y-[2rem]',
            'gap-y-[1rem]',
            'grid-cols-1',
          )}
        >
          {myStageInfo?.stages.map((stage) => (
            <Stage key={stage.stageId} stage={stage} isMyStage={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyStageContainer;
