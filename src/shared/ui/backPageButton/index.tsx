'use client';

import { useRouter } from 'next/navigation';
import { LeftArrow } from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';

interface BackPageButtonProps {
  type?: 'push' | 'back';
  path?: string;
  label?: string;
  onClick?: () => void;
}

const BackPageButton = ({
  type = 'back',
  path = '/',
  label = '뒤로가기',
  onClick,
}: BackPageButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (type === 'push' && path) {
      router.push(path);
    } else {
      router.back();
    }
  };

  return (
    <div className={cn('flex', 'items-center', 'gap-24')}>
      <button type="button" onClick={handleClick} aria-label={label}>
        <LeftArrow />
      </button>
      <p className={cn('mobile:text-h4s', 'text-white', 'text-body2s')}>
        {label}
      </p>
    </div>
  );
};

export default BackPageButton;
