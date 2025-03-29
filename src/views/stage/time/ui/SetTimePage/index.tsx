'use client';

import BackPageButton from '@/shared/ui/backPageButton';
import Button from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';

const SetTimePage = () => {
  return (
    <div className={cn('flex', 'justify-center', 'w-full')}>
      <div
        className={cn(
          'w-full',
          'max-w-[1320px]',
          'flex',
          'flex-col',
          'mt-28',
          'align-middle',
          'justify-center',
        )}
      >
        <div className={cn('m-30')}>
          <BackPageButton type="back" label="팀들 날짜와 시간 설정하기" />
        </div>

        <div className={cn('p-30', 'mt-32')}>
          <Button>확인</Button>
        </div>
      </div>
    </div>
  );
};

export default SetTimePage;
