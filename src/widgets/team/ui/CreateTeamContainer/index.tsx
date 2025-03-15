'use client';

import BackPageButton from '@/shared/ui/backPageButton';
import Button from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';

const CreateTeamContainer = () => {
  return (
    <div className={cn('h-screen', 'bg-black', 'p-30', 'flex', 'flex-col')}>
      <header className={cn('mb-30')}>
        <BackPageButton type="back" label="팀 생성하기" />
      </header>
      <div className={cn('flex-1', 'flex', 'flex-col')}>
        <h2 className={cn('text-body2e', 'text-white', 'mb-16')}>입장 번호</h2>
        <div className={cn('mb-24')}>
          <Input placeholder="입장 번호 입력" />
        </div>

        <h2 className={cn('text-body2e', 'text-white', 'mb-16')}>팀 이름</h2>
        <div className={cn('mb-30')}>
          <Input placeholder="이름을 입력해주세요." maxLength={10} />
        </div>

        <h2 className={cn('text-body2e', 'text-white', 'mb-16', 'mt-30')}>
          인원
        </h2>
        <div>
          <Input placeholder="학생을 입력해주세요." />
        </div>
      </div>
      <div className={cn('mt-60', 'mb-30')}>
        <Button bg="bg-main-600" textColor="text-white">
          확인
        </Button>
      </div>
    </div>
  );
};

export default CreateTeamContainer;
