'use client';

import { useRouter } from 'next/navigation';
import { LeftArrow } from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';

const BackPageButton = () => {
  const router = useRouter();

  return (
    <div className={cn('flex', 'items-center', 'gap-24')}>
      <button onClick={() => router.back()} aria-label="뒤로가기">
        <LeftArrow />
      </button>
      <p className={cn('text-h4s', 'text-white')}>뒤로가기</p>
    </div>
  );
};

export default BackPageButton;
