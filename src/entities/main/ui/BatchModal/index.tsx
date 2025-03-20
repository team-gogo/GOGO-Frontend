'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import ModalLayout from '@/shared/ui/modalLayout';
import { cn } from '@/shared/utils/cn';

interface BatchModalProps {
  onClose: () => void;
}

interface BatchMatchType {
  winTeanId: number;
  aTeamScore: number;
  bTeamScore: number;
}

const BatchModal = ({ onClose }: BatchModalProps) => {
  const { register, handleSubmit, reset } = useForm<BatchMatchType>();

  const onSubmit: SubmitHandler<BatchMatchType> = async (data) => {
    console.log(data);

    reset();
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
            <h2 className={cn('text-h4e', 'text-white')}>A팀</h2>
            <Input
              {...register('aTeamScore', { required: true })}
              placeholder="스코어 입력"
              bgColor="bg-gray-600"
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
            <h2 className={cn('text-h4e', 'text-white')}>B팀</h2>
            <Input
              {...register('bTeamScore', { required: true })}
              placeholder="스코어 입력"
              bgColor="bg-gray-600"
              isPlcCenter={true}
            />
          </div>
        </div>
        <Button type="submit">정산완료</Button>
      </form>
    </ModalLayout>
  );
};

export default BatchModal;
