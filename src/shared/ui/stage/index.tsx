'use client';

import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { MyStageType } from '@/shared/types/my';
import { StagesType } from '@/shared/types/stage';
import { cn } from '@/shared/utils/cn';
import Button from '../button';
import MatchTypeLabel from '../matchTypeLabel';

interface StageProps {
  stage: MyStageType | StagesType;
  setIsModalOpen?: Dispatch<SetStateAction<boolean>>;
  isMyStage?: boolean;
}

const Stage = ({ stage, setIsModalOpen, isMyStage = false }: StageProps) => {
  const { stageName, type, status, isMaintaining } = stage;

  const { push } = useRouter();

  const isParticipating =
    'isParticipating' in stage ? stage.isParticipating : undefined;

  const isPassCode = 'isPassCode' in stage ? stage.isPassCode : undefined;

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
            <div className={cn('flex', 'items-center', 'gap-[0.625rem]')}>
              {type.map((t) => (
                <MatchTypeLabel key={t} type={t} color="#FFF" />
              ))}
              {isMaintaining && <MatchTypeLabel type="ADMIN" color="#526FFE" />}
              {status === 'RECRUITING' ? (
                <MatchTypeLabel type="RECRUITING" color="#01C612" />
              ) : status === 'CONFIRMED' ? (
                <MatchTypeLabel type="CONFIRMED" color="#898989" />
              ) : null}
            </div>
            {/* {isAdmin && <Tag TagType={'STREAMING'} />} */}
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
              isLocked={isParticipating || isMyStage ? false : true}
              onClick={() => {
                isPassCode
                  ? setIsModalOpen?.(true)
                  : isMyStage
                    ? push(`/my/bet?stageId=${stage.stageId}`)
                    : console.log(1);
              }}
            >
              {isParticipating || isMyStage ? '상세보기' : '참여하기'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stage;
