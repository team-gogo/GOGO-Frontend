'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { LeftArrow, RightArrowIcon } from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';

interface NavigationBarProps {
  totalPairs: number;
}

const NavigationBar = ({ totalPairs }: NavigationBarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  if (totalPairs <= 1) return null;

  const maxPagesToShow = 5;

  const changePage = (page: number) => {
    router.push(`/community?page=${page}`);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      changePage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPairs) {
      changePage(currentPage + 1);
    }
  };

  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPairs, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  return (
    <div className={cn('flex', 'items-center', 'gap-[1.5rem]')}>
      <button onClick={handlePrev} disabled={currentPage === 1}>
        <LeftArrow color="#6B6B6B" size="1.5rem" />
      </button>
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
        <button
          key={startPage + i}
          className={cn(
            'text-body1e',
            currentPage === startPage + i ? 'text-main-600' : 'text-gray-500',
          )}
          onClick={() => changePage(startPage + i)}
        >
          {startPage + i}
        </button>
      ))}
      <button onClick={handleNext} disabled={currentPage === totalPairs}>
        <RightArrowIcon color="#6B6B6B" />
      </button>
    </div>
  );
};

export default NavigationBar;
