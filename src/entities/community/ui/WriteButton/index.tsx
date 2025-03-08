'use client';

import { useRouter } from 'next/navigation';
import { CirclePlusIcon } from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';

const WriteButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/community/create');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'flex',
        'gap-8',
        'py-8',
        'px-12',
        'border-1',
        'border-solid',
        'border-white',
        'items-center',
        'rounded-lg',
      )}
    >
      <CirclePlusIcon />
      <p
        className={cn(
          'text-white',
          'text-nowrap',
          'text-body3s',
          'mobile:text-caption3s',
        )}
      >
        글 쓰기
      </p>
    </button>
  );
};

export default WriteButton;
