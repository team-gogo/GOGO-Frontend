import React from 'react';
import { PointIcon } from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';

const StoreInfo = ({ myPoint }: { myPoint: number }) => {
  return (
    <div className={cn('flex', 'items-center', 'gap-12')}>
      <p className={cn('text-body2s', 'text-white', 'mobile:text-caption1s')}>
        보유 포인트
      </p>
      <div className={cn('flex', 'items-center', 'gap-8')}>
        <p className={cn('text-white', 'text-body2s', 'mobile:text-caption1s')}>
          {myPoint}
        </p>
        <PointIcon fill="#fff" />
      </div>
    </div>
  );
};

export default StoreInfo;
