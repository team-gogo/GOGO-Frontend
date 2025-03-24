'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { usePasswordModalStore } from '@/shared/stores';
import Button from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import ModalLayout from '@/shared/ui/modalLayout';
import { cn } from '@/shared/utils/cn';
import { usePostPassCode } from '../model/usePostPassCode';

interface PasswordModalProps {
  onClose: () => void;
}

interface PassCodeType {
  passCode: string;
}

const PasswordModal = ({ onClose }: PasswordModalProps) => {
  const { clickedStageId } = usePasswordModalStore();
  const { mutate: PostPassCode } = usePostPassCode(clickedStageId);
  const { register, handleSubmit, watch } = useForm<PassCodeType>();

  const { passCode } = watch();

  const Disabled = !passCode;

  const onSubmit: SubmitHandler<PassCodeType> = async (data) => {
    console.log(data);
    PostPassCode(data);
  };

  return (
    <ModalLayout
      title="인증번호를 입력하세요"
      onClose={onClose}
      containerClassName={cn(
        'rounded-lg',
        'bg-gray-700',
        'px-[40px]',
        'py-[36px]',
        'max-w-[795px]',
        'w-full',
        'space-y-24',
      )}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn('flex', 'w-full', 'flex-col', 'gap-[3.75rem]')}
      >
        <Input
          {...register('passCode', { required: true })}
          bgColor="bg-gray-600"
          placeholder="인증번호를 입력해주세요"
        />
        <Button type="submit" disabled={Disabled}>
          확인
        </Button>
      </form>
    </ModalLayout>
  );
};

export default PasswordModal;
