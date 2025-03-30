'use client';

import BackPageButton from '@/shared/ui/backPageButton';
import Button from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';
import SetTimeContainer from '@/widgets/stage/time/ui/SetTimeContainer';
const SetTimePage = () => {
  return (
    <div className={cn('flex', 'justify-center', 'w-full')}>
      <div
        className={cn(
          'w-full',
          'max-w-[1320px]',
          'flex',
          'flex-col',
          'align-middle',
          'justify-center',
          'relative',
        )}
      >
        <div className={cn('m-30')}>
          <BackPageButton type="back" label="팀들 날짜와 시간 설정하기" />
        </div>

        <SetTimeContainer />

        <div
          className={cn(
            'p-30',
            'mt-32',
            'sticky',
            'bottom-0',
            'bg-[#1F1F1F]',
            'z-10',
          )}
        >
          <Button>확인</Button>
        </div>
      </div>
    </div>
  );
};

export default SetTimePage;
