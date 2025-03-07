import React from 'react';
import { PointIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

const StoreInfo = () => {
  return (
    <div className={cn('flex', 'items-center', 'gap-12')}>
      <p className={cn('text-body2s', 'text-white')}>보유 포인트</p>
      <div className={cn('flex', 'items-center', 'gap-8')}>
        <p className={cn('text-white', 'text-body2s')}>2000</p>
        <PointIcon />
      </div>
    </div>
  );
};

export default StoreInfo;
