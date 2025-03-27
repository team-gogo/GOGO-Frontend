'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { usePostPassCode } from '@/entities/stage/ui/model/usePostPassCode';
import { useMyStageIdStore, usePasswordModalStore } from '@/shared/stores';
import useStageNameStore from '@/shared/stores/useStageNameStore';
import { MyStageType } from '@/shared/types/my';
import { StagesType } from '@/shared/types/stage';
import { cn } from '@/shared/utils/cn';
import Button from '../button';
import MatchTypeLabel from '../matchTypeLabel';

interface StageProps {
  stage: MyStageType | StagesType;
  isMyStage?: boolean;
}

const Stage = ({ stage, isMyStage = false }: StageProps) => {
  const { stageId, stageName, type, status, isMaintainer } = stage;

  const { mutate: PostPassCode } = usePostPassCode(stageId);

  const { push } = useRouter();
  const pathname = usePathname();

  const { setStageName } = useStageNameStore();
  const { setIsPasswordModalOpen, setClickedStageId } = usePasswordModalStore();
  const { setStageId } = useMyStageIdStore();

  const isParticipating =
    'isParticipating' in stage ? stage.isParticipating : undefined;

  const isPassCode = 'isPassCode' in stage ? stage.isPassCode : undefined;

  const Participate = isParticipating || isMyStage;

  const isStagePage = pathname === '/stage';

  const handleClick = () => {
    if (status === 'CONFIRMED') {
      push(`/${stageId}`);
    } else if (isParticipating) {
      push(`/stage/stageId=${stage.stageId}`);
    } else if (Participate) {
      setStageId(stageId);
      if (isStagePage) {
        push(`/${stageId}`);
      } else {
        push(`/my/bet?stageId=${stageId}`);
      }
    } else if (isPassCode) {
      setIsPasswordModalOpen(true);
      setClickedStageId(stageId);
    } else {
      PostPassCode(undefined);
      setStageName(stageName);
      push(`/stage/stageId=${stage.stageId}`);
    }
  };

  return (
    <>
      <div
        className={cn(
          'flex',
          'flex-col',
          'p-[1.5rem]',
          'px-[2rem]',
          'rounded-xl',
          'bg-gray-700',
          'max-w-[40rem]',
          'w-full',
        )}
      >
        <div className={cn('flex', 'flex-col', 'justify-center', 'gap-[3rem]')}>
          <div
            className={cn('flex', 'w-full', 'justify-between', 'items-center')}
          >
            <div className={cn('flex', 'items-center', 'gap-[1.5rem]')}>
              <MatchTypeLabel
                type={type === 'OFFICIAL' ? 'OFFICIAL' : 'FAST'}
                color="#FFF"
              />

              {status === 'RECRUITING' ? (
                <MatchTypeLabel type="RECRUITING" color="#01C612" />
              ) : status === 'CONFIRMED' ? (
                <MatchTypeLabel type="CONFIRMED" color="#898989" />
              ) : null}
              {isMaintainer && <MatchTypeLabel type="ADMIN" color="#526FFE" />}
            </div>
            {/* {isStageAdmin && <Tag TagType={'STREAMING'} />} */}
          </div>
          <div
            className={cn(
              'flex',
              'w-full',
              'flex-col',
              'items-center',
              'gap-[3rem]',
            )}
          >
            <h1 className={cn('text-h2e', 'text-white', 'laptop:text-body2e')}>
              {stageName}
            </h1>
            <Button
              isLocked={!Participate && isPassCode}
              onClick={() => handleClick()}
            >
              {isStagePage ? '참여하기' : '상세보기'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stage;
