import React from 'react';
import Button from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';

const SignupContainer = () => {
  return (
    <div className={cn('w-full', 'max-w-[648px]', 'space-y-[72px]', 'px-16')}>
      <h1 className={cn('text-white', 'text-h1e', 'text-center')}>회원가입</h1>
      <div className={cn('space-y-24')}>
        <Input placeholder="학교를 알려주세요." />
        <Input placeholder="이름을 입력해주세요." />
        <div className={cn('flex', 'gap-16', 'items-center')}>
          <Input placeholder="반" />
          <Input placeholder="번호" />
        </div>
        <div className={cn('flex', 'gap-16', 'items-center')}>
          <Button bg="bg-gray-700" textColor="text-gray-400">
            남성
          </Button>
          <Button bg="bg-gray-700" textColor="text-gray-400">
            여성
          </Button>
        </div>
      </div>
      <Button>확인</Button>
    </div>
  );
};

export default SignupContainer;
