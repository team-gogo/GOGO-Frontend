import { useEffect, useRef, useState } from 'react';
import { ArrowDownIcon } from '@/shared/assets/icons';
import { SortType, SPORT_TYPES } from '@/shared/model/sportTypes';
import { cn } from '@/shared/utils/cn';

type SortDropdownProps = {
  selectedSort: SortType;
  onSortSelect: (sort: SortType) => void;
};

const sortItems: Array<{ type: SortType; label: string }> = [
  { type: 'LATEST', label: '최신순' },
  { type: 'LAST', label: '오래된 순' },
  { type: 'LIKE', label: '좋아요 순' },
];

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

  const dropdownItemClasses = (sortType: SortType) =>
    cn(
      'py-12 text-center text-gray-300 transition-colors',
      selectedSort === sortType && 'font-extrabold text-white',
    );

  const DropdownItem = ({
    type,
    label,
    showDivider = true,
  }: {
    type: SortType;
    label: string;
    showDivider?: boolean;
  }) => (
    <>
      <button
        className={dropdownItemClasses(type)}
        onClick={() => handleSortSelect(type)}
      >
        {label}
      </button>
      {showDivider && (
        <div className={cn('flex justify-center')}>
          <div className={cn('h-[1px] w-[90%] bg-main-400')} />
        </div>
      )}
    </>
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={cn(
          'flex w-fit items-center gap-8 text-nowrap',
          'h-[1.875rem] tablet:h-[2.8125rem]',
          'rounded-lg p-[0.25rem] px-12',
          'border-1 border-solid border-main-500',
          'cursor-pointer',
          isDropdownOpen && 'bg-main-500 text-white',
        )}
      >
        <div
          className={cn(
            'transition-transform duration-200',
            isDropdownOpen ? 'rotate-180' : 'rotate-0',
          )}
        >
          <ArrowDownIcon
            color={isDropdownOpen ? 'white' : '#526FFE'}
            size={20}
          />
        </div>
        <p
          className={cn(
            'text-caption2s leading-[1.3125rem] tablet:text-body3s',
            isDropdownOpen ? 'text-white' : 'text-main-500',
          )}
        >
          {SPORT_TYPES[selectedSort]?.text}
        </p>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 z-10 mt-4 w-32 overflow-hidden rounded-lg bg-main-500 shadow-lg">
          <div className={cn('flex flex-col')}>
            {sortItems.map((item, index) => (
              <DropdownItem
                key={item.type}
                type={item.type}
                label={item.label}
                showDivider={index < sortItems.length - 1}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
