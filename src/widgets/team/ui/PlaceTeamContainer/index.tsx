'use client';

import BackPageButton from '@/shared/ui/backPageButton';
import Button from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';

const PlaceTeamContainer = () => {
  return (
    <div className={cn('h-screen', 'bg-black', 'p-30', 'flex', 'flex-col')}>
      <header className={cn('mb-30')}>
        <BackPageButton type="back" label="팀 생성하기" />
      </header>

      <div className={cn('mt-60', 'mb-30')}>
        <Button bg="bg-main-600" textColor="text-white">
          확인
        </Button>
      </div>
    </div>
  );
};

export default PlaceTeamContainer;
