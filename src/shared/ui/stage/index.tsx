'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { usePostPassCode } from '@/entities/stage/ui/model/usePostPassCode';
import KebabMenuIcon from '@/shared/assets/icons/KebabMenuIcon';
import {
  useMyStageIdStore,
  usePasswordModalStore,
  useStageStatus,
} from '@/shared/stores';
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
  const [menuOpen, setMenuOpen] = useState(false);

  const { mutate: PostPassCode } = usePostPassCode(stageId);

  const { push } = useRouter();
  const pathname = usePathname();

  const { setStageName } = useStageNameStore();
  const { setIsPasswordModalOpen, setClickedStageId } = usePasswordModalStore();
  const { setStageId } = useMyStageIdStore();
  const { setIsStatusConfirmed } = useStageStatus();

  const isParticipating =
    'isParticipating' in stage ? stage.isParticipating : undefined;

  const isPassCode = 'isPassCode' in stage ? stage.isPassCode : undefined;

  const Participate = isParticipating || isMyStage;

  const isStagePage = pathname === '/stage';

  useEffect(() => {
    setStageId(Number(stageId));
  }, []);

  const handleClick = () => {
    if (isMyStage) {
      setStageId(stageId);
      if (status === 'CONFIRMED') {
        setIsStatusConfirmed(true);
        push(`/my/bet/${stageId}`);
      } else {
        toast.error('스테이지가 아직 확정되지 않았습니다.');
      }
    } else if (status === 'CONFIRMED') {
      setIsStatusConfirmed(true);
      if (!isParticipating) {
        if (isPassCode) {
          setIsPasswordModalOpen(true);
          setClickedStageId(stageId);
        } else {
          PostPassCode(undefined);
          setStageName(stageName);
        }
      } else if (isParticipating && isStagePage) {
        push(`/main/${stageId}`);
      }
    } else if (isParticipating) {
      push(`/stage/stageId=${stage.stageId}`);
    } else if (Participate) {
      setStageId(stageId);
      if (isStagePage) {
        push(`/main/${stageId}`);
      } else {
        setStageId(stageId);
        push(`/my/bet/${stageId}`);
      }
    } else if (isPassCode) {
      setIsPasswordModalOpen(true);
      setClickedStageId(stageId);
    } else {
      setIsStatusConfirmed(false);
      PostPassCode(undefined);
      setStageName(stageName);
    }
  };

  return (
    <>
      <div
        className={cn(
          'flex',
          'flex-col',
          'py-[1.5rem]',
          'px-[2rem]',
          'phone:px-[1.25rem]',
          'phone:py-[1.25rem]',
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
            <div className="relative">
              {isMaintainer && (
                <button onClick={() => setMenuOpen(!menuOpen)}>
                  <KebabMenuIcon />
                </button>
              )}
              {menuOpen && (
                <>
                  <div
                    className={cn('fixed', 'inset-0', 'z-10')}
                    onClick={() => setMenuOpen(false)}
                  />
                  <div
                    className={cn(
                      'absolute',
                      'right-0',
                      'top-[2rem]',
                      'z-20',
                      'rounded-xl',
                      'bg-gray-700',
                      'py-[1.5rem]',
                      'px-[2rem]',
                      'shadow-[0px_0px_18px_0px_rgba(0,0,0,0.25)]',
                      'min-w-[11rem]',
                    )}
                  >
                    <div
                      className={cn(
                        'flex',
                        'flex-col',
                        'items-center',
                        'gap-[1.5rem]',
                      )}
                    >
                      {isMaintainer ? (
                        <>
                          <button
                            className={cn(
                              'text-body2s',
                              'text-gray-400',
                              'hover:text-white',
                            )}
                            onClick={() => {
                              setMenuOpen(false);
                            }}
                          >
                            스테이지 종료
                          </button>
                          <button
                            className={cn(
                              'text-body2s',
                              'text-gray-400',
                              'hover:text-white',
                            )}
                            onClick={() => {
                              setMenuOpen(false);
                            }}
                          >
                            중계 설정
                          </button>
                        </>
                      ) : null}
                      <button
                        className={cn(
                          'text-body2s',
                          'text-gray-400',
                          'hover:text-white',
                        )}
                        onClick={() => {
                          setMenuOpen(false);
                        }}
                      >
                        취소
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
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
            <h1 className={cn('laptop:text-h2e', 'text-white', 'text-body2e')}>
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
