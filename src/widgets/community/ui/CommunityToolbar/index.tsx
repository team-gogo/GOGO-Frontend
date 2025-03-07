'use client';

import { CommunityIcon } from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';
import FilterButton from '../../../../entities/community/ui/FilterButton';
import WriteButton from '../../../../entities/community/ui/WriteButton';

const CommunityToolbar = () => {
  return (
    <div className={cn('flex', 'gap-[32px]', 'justify-between')}>
      <div className={cn('flex', 'items-center', 'gap-12')}>
        <CommunityIcon />
        <p
          className={cn(
            'text-white',
            'text-body1e',
            'mobile:text-body3e',
            'text-nowrap',
          )}
        >
          커뮤니티
        </p>
      </div>
      <div className={cn('flex', 'items-center', 'gap-12')}>
        <WriteButton />
        <FilterButton />
      </div>
    </div>
  );
};

export default CommunityToolbar;
