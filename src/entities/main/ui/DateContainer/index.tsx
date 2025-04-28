'use client';

import { useEffect, useState } from 'react';
import { LeftArrow, RightArrowIcon } from '@/shared/assets/svg';
import { useMyStageIdStore, useSelectDateStore } from '@/shared/stores';
import { cn } from '@/shared/utils/cn';

const DateContainer = () => {
  const today = new Date();
  const totalDays = 100;
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 650) {
        setVisibleCount(1);
      } else if (window.innerWidth < 880) {
        setVisibleCount(3);
      } else {
        setVisibleCount(5);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const pastDays = Math.floor(totalDays / 2);

  const { setSelectDate } = useSelectDateStore();
  const { stageId } = useMyStageIdStore();

  const dates = Array.from({ length: totalDays }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - pastDays + index);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return { short: `${month}-${day}`, full: `${year}-${month}-${day}` };
  });

  useEffect(() => {
    const localSelectDate = sessionStorage.getItem('selectDate');

    if (localSelectDate) {
      const { selectDate: localDate, stageId: localStageId } =
        JSON.parse(localSelectDate);

      if (stageId === localStageId) {
        const matchedDate = dates.find((d) => d.full === localDate);

        if (matchedDate) {
          setSelectedDate(matchedDate.short);
          setSelectDate(matchedDate.full);
        } else {
          const date = new Date(localDate);
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          const short = `${month}-${day}`;

          setSelectedDate(short);
          setSelectDate(localDate);
        }
      }
    }

    sessionStorage.removeItem('selectDate');
  }, [dates]);

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
    <div
      className={cn(
        'flex',
        'items-center',
        'pad:w-[30rem]',
        'tablet:w-[40rem]',
        'justify-end',
      )}
    >
      <div
        className={cn(
          'flex',
          'w-full',
          'justify-end',
          'items-center',
          'gap-[1rem]',
        )}
      >
        <button onClick={handlePrev}>
          <LeftArrow
            color="#6B6B6B"
            size={visibleCount === 1 ? '1.5rem' : '2.5rem'}
          />
        </button>
        {dates
          .slice(startIndex, startIndex + visibleCount)
          .map((date, index) => (
            <button
              key={index}
              className={cn(
                'flex',
                'w-full',
                'max-w-[5.25rem]',
                'items-center',
                'justify-center',
                'gap-[0.5rem]',
                'rounded-lg',
                'border-[0.0625rem]',
                'border-solid',
                'border-gray-500',
                'px-[1rem]',
                'tablet:px-[0.75rem]',
                'py-[0.75rem]',
                'text-gray-500',
                selectedDate === date.short &&
                  'border-main-600 bg-main-600 text-white',
              )}
              onClick={() => handleDateChange(startIndex + index)}
            >
              <p className={cn('text-body3s')}>{date.short}</p>
            </button>
          ))}
        <button onClick={handleNext}>
          <RightArrowIcon size={visibleCount === 1 ? '1.5rem' : '2.5rem'} />
        </button>
      </div>
    </div>
  );
};

export default DateContainer;
