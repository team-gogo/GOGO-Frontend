'use client';

import { useState } from 'react';
import { LeftArrow, RightArrowIcon } from '@/shared/assets/svg';
import { useSelectDateStore } from '@/shared/stores';
import { cn } from '@/shared/utils/cn';

const DateContainer = () => {
  const today = new Date();
  const totalDays = 100;
  const visibleCount = 5;
  const pastDays = Math.floor(totalDays / 2);

  const { setSelectDate } = useSelectDateStore();

  const dates = Array.from({ length: totalDays }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - pastDays + index);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return { short: `${month}-${day}`, full: `${year}-${month}-${day}` };
  });

  const todayIndex = dates.findIndex(
    (d) =>
      d.short ===
      `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`,
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    dates[todayIndex].short,
  );
  const [startIndex, setStartIndex] = useState(todayIndex);

  const handleDateChange = (index: number) => {
    setSelectedDate(dates[index].short);
    setSelectDate(dates[index].full); // YYYY-MM-DD 형식으로 저장
  };

  const handlePrev = () => {
    const currentIndex = dates.findIndex((d) => d.short === selectedDate);
    if (currentIndex > 0) {
      handleDateChange(currentIndex - 1);
      if (currentIndex - 1 < startIndex) {
        setStartIndex(startIndex - 1);
      }
    }
  };

  const handleNext = () => {
    const currentIndex = dates.findIndex((d) => d.short === selectedDate);
    if (currentIndex < dates.length - 1) {
      handleDateChange(currentIndex + 1);
      if (currentIndex + 1 >= startIndex + visibleCount) {
        setStartIndex(startIndex + 1);
      }
    }
  };

  return (
    <div className={cn('flex w-full items-center justify-end gap-[1rem]')}>
      <button onClick={handlePrev}>
        <LeftArrow color="#6B6B6B" />
      </button>
      <div className={cn('flex items-center gap-[1rem]')}>
        {dates
          .slice(startIndex, startIndex + visibleCount)
          .map((date, index) => (
            <button
              key={index}
              className={cn(
                'flex w-[5.25rem] items-center justify-center gap-[0.5rem] rounded-lg border-[0.0625rem] border-solid border-gray-500 px-[1rem] py-[0.75rem] text-gray-500 laptop:px-[0.5rem] laptop:py-[0.25rem]',
                selectedDate === date.short &&
                  'border-main-600 bg-main-600 text-white',
              )}
              onClick={() => handleDateChange(startIndex + index)}
            >
              <p className={cn('text-body3s')}>{date.short}</p>
            </button>
          ))}
      </div>
      <button onClick={handleNext}>
        <RightArrowIcon size="2.5rem" />
      </button>
    </div>
  );
};

export default DateContainer;
