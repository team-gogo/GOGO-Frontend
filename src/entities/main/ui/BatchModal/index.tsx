'use client';

import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { WarningIcon } from '@/shared/assets/svg';
import { useMatchTeamStore } from '@/shared/stores';
import { BatchMatchType } from '@/shared/types/main';
import Button from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import ModalLayout from '@/shared/ui/modalLayout';
import { cn } from '@/shared/utils/cn';
import { formatBatchData } from '../../model/formatBatchData';
import { usePostBatchMatch } from '../../model/usePostBatchMatch';

interface BatchModalProps {
  onClose: () => void;
}

const BatchModal = ({ onClose }: BatchModalProps) => {
  const { aTeam, bTeam, matchId } = useMatchTeamStore();
  const { mutate: PostBatch } = usePostBatchMatch(matchId);
  const [winTeamId, setTeamId] = useState<number>();

  const { register, handleSubmit, reset, watch, setValue } =
    useForm<BatchMatchType>();

  const { aTeamScore, bTeamScore } = watch();

  useEffect(() => {
    const aScore = Number(aTeamScore);
    const bScore = Number(bTeamScore);

    if (!isNaN(aScore) && !isNaN(bScore)) {
      if (aScore > bScore) {
        setTeamId(aTeam?.teamId);
      } else if (bScore > aScore) {
        setTeamId(bTeam?.teamId);
      }
    }
  }, [aTeamScore, bTeamScore, aTeam?.teamId, bTeam?.teamId]);

  useEffect(() => {
    if (winTeamId !== undefined) {
      setValue('winTeamId', winTeamId);
    }
  }, [winTeamId, setValue]);

  const isDisabled = !aTeamScore || !bTeamScore;

  const onSubmit: SubmitHandler<BatchMatchType> = async (data) => {
    const formattedData = formatBatchData(data);
    PostBatch(formattedData);

    reset();
    onClose();
  };

  return (
    <ModalLayout
      title={'정산하기'}
      onClose={onClose}
      containerClassName={cn(
        'rounded-lg',
        'bg-gray-700',
        'tablet:px-[2.5rem]',
        'tablet:py-[2.25rem]',
        'px-[1.5rem]',
        'py-[1.25rem]',
        'max-w-[38.75rem]',
        'w-full',
        'space-y-24',
        'm-20',
      )}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          'flex',
          'flex-col',
          'items-center',
          'justify-center',
          'pad:gap-[3.75rem]',
          'gap-[1.5rem]',
          'w-full',
        )}
      >
        <div
          className={cn(
            'flex',
            'items-center',
            'justify-center',
            'gap-[1.5rem]',
            'w-full',
            'pad:pt-[2rem]',
          )}
        >
          <div
            className={cn(
              'flex',
              'w-full',
              'flex-col',
              'items-center',
              'gap-[1rem]',
            )}
          >
            <h2 className={cn('tablet:text-h4e', 'text-body2s', 'text-white')}>
              {aTeam?.teamName}
            </h2>
            <Input
              {...register('aTeamScore', { required: true })}
              placeholder="스코어 입력"
              bgColor="bg-gray-600"
              type="number"
              isPlcCenter={true}
            />
          </div>

          <div
            className={cn(
              'flex',
              'w-full',
              'flex-col',
              'items-center',
              'gap-[1rem]',
            )}
          >
            <h2 className={cn('tablet:text-h4e', 'text-body2s', 'text-white')}>
              {bTeam?.teamName}
            </h2>
            <Input
              {...register('bTeamScore', { required: true })}
              placeholder="스코어 입력"
              bgColor="bg-gray-600"
              type="number"
              isPlcCenter={true}
            />
          </div>
        </div>
        <div
          className={cn(
            'flex',
            'w-full',
            'flex-col',
            'items-center',
            'gap-[0.75rem]',
          )}
        >
          <Button disabled={isDisabled} type="submit">
            정산완료
          </Button>
          <div className={cn('flex', 'items-center', 'gap-[0.5rem]')}>
            <WarningIcon />
            <p
              className={cn(
                'pad:text-caption1s',
                'text-caption3s',
                'text-gray-500',
              )}
            >
              정산 완료 후 5분 이내에만 취소할 수 있습니다.
            </p>
          </div>
        </div>
      </form>
    </ModalLayout>
  );
};

export default BatchModal;
