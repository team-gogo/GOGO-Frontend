'use client';

import { useRouter } from 'next/navigation';
import { LeftArrow } from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';

interface BackPageButtonProps {
  type?: 'push' | 'back';
  path?: string;
  label?: string;
}

const BackPageButton = ({
  type = 'back',
  path = '/',
  label = '뒤로가기',
}: BackPageButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (type === 'push' && path) {
      router.push(path);
    } else {
      router.back();
    }
  };

  return (
    <div className={cn('flex', 'items-center', 'gap-24')}>
      <button onClick={handleClick} aria-label={label}>
        <LeftArrow />
      </button>
      <p className={cn('text-h4s', 'text-white', 'mobile:text-body2s')}>
        {label}
      </p>
    </div>
  );
};

export default BackPageButton;
