import { useEffect, useRef, useState } from 'react';
import { SortType } from '@/shared/model/sportTypes';
import SportTypeLabel from '@/shared/ui/sportTypelabel';
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

  return (
    <div className="relative" ref={dropdownRef}>
      <SportTypeLabel
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        type={selectedSort}
        asButton
        isHaveBorder
        isSelected={isDropdownOpen}
      />

      {isDropdownOpen && (
        <div className="absolute right-0 z-10 mt-4 w-32 overflow-hidden rounded-lg bg-main-500 shadow-lg">
          <div className={cn('flex', 'flex-col')}>
            <button
              className={cn(
                'py-12 text-center text-white transition-colors',
                selectedSort === 'LATEST' && 'bg-[#4051B8]',
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
                'py-12 text-center text-white transition-colors',
                selectedSort === 'LAST' && 'bg-[#4051B8]',
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
                'py-12 text-center text-white transition-colors',
                selectedSort === 'LIKE' && 'bg-[#4051B8]',
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
