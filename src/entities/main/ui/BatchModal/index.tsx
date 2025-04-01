'use client';

import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { WarningIcon } from '@/shared/assets/svg';
import { useMatchBatchArrStore, useMatchTeamStore } from '@/shared/stores';
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

  const { register, handleSubmit, reset, watch, setValue } =
    useForm<BatchMatchType>();

  const { aTeamScore, bTeamScore } = watch();

  useEffect(() => {
    if (aTeamScore && bTeamScore) {
      setValue(
        'winTeamId',
        Number(aTeamScore > bTeamScore ? aTeam?.teamId : bTeam?.teamId),
      );
    }
  }, [aTeamScore, bTeamScore, aTeam?.teamId, bTeam?.teamId, setValue]);

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
        'px-[40px]',
        'py-[36px]',
        'max-w-[38.75rem]',
        'w-full',
        'space-y-24',
      )}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          'flex',
          'flex-col',
          'items-center',
          'justify-center',
          'gap-[3.75rem]',
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
            'pt-[2rem]',
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
            <h2 className={cn('text-h4e', 'text-white')}>{aTeam?.teamName}</h2>
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
            <h2 className={cn('text-h4e', 'text-white')}>{bTeam?.teamName}</h2>
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
            <p className={cn('text-caption1s', 'text-gray-500')}>
              정산 완료 후 5분 이내에만 취소할 수 있습니다.
            </p>
          </div>
        </div>
      </form>
    </ModalLayout>
  );
};

export default BatchModal;
