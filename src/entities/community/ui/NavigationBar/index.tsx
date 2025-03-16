import { useState } from 'react';
import { LeftArrow, RightArrowIcon } from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';

interface NavigationBarProps {
  totalPairs: number;
  onPageChange: (page: number) => void;
}

const NavigationBar = ({ totalPairs, onPageChange }: NavigationBarProps) => {
  const safeTotalPairs = totalPairs ?? 1;
  if (safeTotalPairs <= 1) return null;

  const [currentPage, setCurrentPage] = useState(1);
  const maxPagesToShow = 5;

  const handlePrev = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      onPageChange(newPage);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPairs) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      onPageChange(newPage);
    }
  };

  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPairs, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  return (
    <div className={cn('flex', 'items-center', 'gap-[1.5rem]')}>
      <button onClick={handlePrev}>
        <LeftArrow color="#6B6B6B" size="1.5rem" />
      </button>
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
        <button
          key={startPage + i}
          className={cn(
            'text-body1e',
            currentPage === startPage + i ? 'text-main-600' : 'text-gray-500',
          )}
          onClick={() => {
            setCurrentPage(startPage + i);
            onPageChange(startPage + i);
          }}
        >
          {startPage + i}
        </button>
      ))}
      <button onClick={handleNext}>
        <RightArrowIcon color="#6B6B6B" />
      </button>
    </div>
  );
};

export default NavigationBar;
