'use client';

import { useState } from 'react';
import { LeftArrow } from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';

const DateContainer = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<string>(
    `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`,
  );

  const dates = Array.from({ length: 10 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}-${day}`;
  });

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  return (
    <div
      className={cn(
        'flex',
        'w-full',
        'items-center',
        'justify-center',
        'gap-[1rem]',
      )}
    >
      <button>
        <LeftArrow color="#6B6B6B" />
      </button>
      <div className={cn('flex', 'items-center', 'gap-[1rem]')}>
        {dates.map((date, index) => (
          <button
            key={index}
            className={cn(
              'flex',
              'w-[5.25rem]',
              'py-[0.75rem]',
              'px-[1rem]',
              'laptop:py-[0.25rem]',
              'laptop:px-[0.5rem]',
              'justify-center',
              'items-center',
              'gap-[0.5rem]',
              'rounded-lg',
              'border-[0.0625rem]',
              'border-solid',
              'border-gray-500',
              'text-gray-500',
              'hover:bg-main-600',
              'hover:text-white',
              'hover:border-main-600',
              selectedDate === date && 'border-main-600 bg-main-600 text-white', // 선택된 날짜에 스타일 적용
            )}
            onClick={() => handleDateClick(date)}
          >
            <p className={cn('text-body3s')}>{date}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DateContainer;
