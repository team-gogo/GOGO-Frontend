'use client';

import { useRouter } from 'next/navigation';
import { RightArrowIcon } from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';

interface SectionWrapperProps {
  text: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  path?: string;
  onClick?: () => void;
}

const SectionWrapper = ({
  text,
  icon,
  children,
  path = '/',
  onClick,
}: SectionWrapperProps) => {
  const { push } = useRouter();

  const handleClick = () => {
    onClick?.();
    push(path);
  };

  return (
    <div
      className={cn(
        'flex',
        'w-full',
        'flex-col',
        'items-center',
        'gap-[1.5rem]',
      )}
    >
      <div className={cn('flex', 'w-full', 'justify-between', 'items-center')}>
        <div className={cn('flex', 'items-center', 'gap-[0.75rem]')}>
          {icon}
          <h2 className={cn('pad:text-body1e', 'text-body3e', 'text-white')}>
            {text}
          </h2>
        </div>
        <button
          className={cn('flex', 'items-center', 'gap-[0.5rem]')}
          onClick={handleClick}
        >
          <p className={cn('text-body3s', 'text-gray-500')}>더보기</p>
          <RightArrowIcon />
        </button>
      </div>
      {children}
    </div>
  );
};

export default SectionWrapper;
