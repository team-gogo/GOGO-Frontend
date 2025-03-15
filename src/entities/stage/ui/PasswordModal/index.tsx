'use client';

import React from 'react';
import Button from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import ModalLayout from '@/shared/ui/modalLayout';
import { cn } from '@/shared/utils/cn';

interface PasswordModalProps {
  onClose: () => void;
}

const PasswordModal = ({ onClose }: PasswordModalProps) => {
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
      <div className={cn('flex', 'w-full', 'flex-col', 'gap-[3.75rem]')}>
        <Input bgColor="bg-gray-600" placeholder="인증번호를 입력해주세요" />
        <Button onClick={onClose}>확인</Button>
      </div>
    </ModalLayout>
  );
};

export default PasswordModal;
