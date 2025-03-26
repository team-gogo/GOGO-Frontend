'use client';

import { useCallback, useState } from 'react';
import TeamItem from '@/entities/stage/bracket/ui/TeamItem';
import { cn } from '@/shared/utils/cn';

interface TeamArrayProps {
  className?: string;
}

const VISIBLE_ITEMS = 8;

const TeamArray = ({ className }: TeamArrayProps) => {
  const teams = Array.from({ length: 10 }, (_, i) => `TBD ${i + 1}`);
  const [currentIndex, setCurrentIndex] = useState(0);

  const arrowButtonStyle = {
    color: '#ffffff',
    fontSize: '24px',
  };

  const canScrollPrev = currentIndex > 0;
  const canScrollNext = currentIndex + VISIBLE_ITEMS < teams.length;

  const scrollToNext = useCallback(() => {
    if (!canScrollNext) return;
    setCurrentIndex((prev) => prev + 1);
  }, [canScrollNext]);

  const scrollToPrev = useCallback(() => {
    if (!canScrollPrev) return;
    setCurrentIndex((prev) => prev - 1);
  }, [canScrollPrev]);

  const containerWidth = 180 * VISIBLE_ITEMS + 12 * (VISIBLE_ITEMS - 1);

  const visibleTeams = teams.slice(currentIndex, currentIndex + VISIBLE_ITEMS);

  return (
    <div className={cn('m-30', 'relative', className)}>
      <button
        onClick={scrollToPrev}
        className={cn(
          'absolute',
          'left-[-40px]',
          'top-1/2',
          '-translate-y-1/2',
          'z-10',
          'w-[30px]',
          'h-[30px]',
          'flex',
          'items-center',
          'justify-center',
          !canScrollPrev && 'opacity-50',
          !canScrollPrev && 'cursor-not-allowed',
        )}
        style={arrowButtonStyle}
        disabled={!canScrollPrev}
      >
        {'<'}
      </button>

      <div
        className={cn(
          'bg-gray-700',
          'rounded-lg',
          'py-16',
          'flex',
          'justify-center',
          'overflow-hidden',
        )}
      >
        <div style={{ width: containerWidth }} className={cn('flex', 'gap-12')}>
          {visibleTeams.map((team, index) => (
            <TeamItem
              key={currentIndex + index}
              teamName={team}
              className={cn('flex-shrink-0')}
            />
          ))}
        </div>
      </div>

      <button
        onClick={scrollToNext}
        className={cn(
          'absolute',
          'right-[-40px]',
          'top-1/2',
          '-translate-y-1/2',
          'z-10',
          'w-[30px]',
          'h-[30px]',
          'flex',
          'items-center',
          'justify-center',
          !canScrollNext && 'opacity-50',
          !canScrollNext && 'cursor-not-allowed',
        )}
        style={arrowButtonStyle}
        disabled={!canScrollNext}
      >
        {'>'}
      </button>
    </div>
  );
};

export default TeamArray;
