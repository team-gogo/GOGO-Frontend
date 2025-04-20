import { useEffect, useRef, useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@/shared/assets/icons';
import { SortType, SPORT_TYPES } from '@/shared/model/sportTypes';
import { cn } from '@/shared/utils/cn';

interface SortDropdownProps {
  selectedSort: SortType;
  onSortSelect: (sort: SortType) => void;
}

const SortDropdown = ({ selectedSort, onSortSelect }: SortDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSortSelect = (sort: SortType) => {
    onSortSelect(sort);
    setIsDropdownOpen(false);
  };

  const selectedSortText = SPORT_TYPES[selectedSort]?.text;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={cn(
          'w-fit',
          'flex',
          'gap-8',
          'text-nowrap',
          'items-center',
          'tablet:h-[2.8125rem]',
          'h-[1.875rem]',
          'p-[0.25rem]',
          'px-12',
          'rounded-lg',
          'border-1',
          'border-solid',
          'border-main-500',
          isDropdownOpen && 'bg-main-500 text-white',
          'cursor-pointer',
        )}
      >
        <label>
          {isDropdownOpen ? (
            <ArrowUpIcon
              color={isDropdownOpen ? 'white' : '#526FFE'}
              size={20}
            />
          ) : (
            <ArrowDownIcon
              color={isDropdownOpen ? 'white' : '#526FFE'}
              size={20}
            />
          )}
        </label>
        <p
          className={cn(
            'tablet:text-body3s',
            'leading-[1.3125rem]',
            'text-caption2s',
            isDropdownOpen ? 'text-white' : 'text-main-500',
          )}
        >
          {selectedSortText}
        </p>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 z-10 mt-4 w-32 overflow-hidden rounded-lg bg-main-500 shadow-lg">
          <div className={cn('flex', 'flex-col')}>
            <button
              className={cn(
                'py-12 text-center text-gray-300 transition-colors',
                selectedSort === 'LATEST' && 'font-extrabold text-white',
              )}
              onClick={() => handleSortSelect('LATEST')}
            >
              최신순
            </button>
            <div className={cn('flex', 'justify-center')}>
              <div className={cn('h-[1px] w-[90%] bg-main-400')} />
            </div>
            <button
              className={cn(
                'py-12 text-center text-gray-300 transition-colors',
                selectedSort === 'LAST' && 'font-extrabold text-white',
              )}
              onClick={() => handleSortSelect('LAST')}
            >
              오래된 순
            </button>
            <div className={cn('flex', 'justify-center')}>
              <div className={cn('h-[1px] w-[90%] bg-main-400')} />
            </div>
            <button
              className={cn(
                'py-12 text-center text-gray-300 transition-colors',
                selectedSort === 'LIKE' && 'font-extrabold text-white',
              )}
              onClick={() => handleSortSelect('LIKE')}
            >
              좋아요 순
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
