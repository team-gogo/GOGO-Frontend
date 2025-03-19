import React, { useState } from 'react';
import Button from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';

interface SearchResultsProps<T> {
  items: T[] | null | undefined;
  isLoading: boolean;
  onSelect: (items: T[]) => void;
  getDisplayName: (item: T) => string;
  getSubText?: (item: T) => string;
  isAbsolute: boolean;
  multiSelect?: boolean;
  selectedItems?: T[];
}

function SearchResults<T>({
  items,
  isLoading,
  onSelect,
  getDisplayName,
  getSubText,
  isAbsolute,
  multiSelect = false,
  selectedItems = [],
}: SearchResultsProps<T>) {
  const [localSelectedItems, setLocalSelectedItems] =
    useState<T[]>(selectedItems);

  const handleItemClick = (item: T) => {
    if (multiSelect) {
      setLocalSelectedItems((prev) =>
        prev.some((i) => i === item)
          ? prev.filter((i) => i !== item)
          : [...prev, item],
      );
    } else {
      setLocalSelectedItems([item]);
    }
  };

  const handleConfirm = () => {
    onSelect(localSelectedItems);
  };

  return (
    <ul
      className={cn(
        'bg-gray-700',
        'rounded-lg',
        'mt-16',
        'p-24',
        'space-y-24',
        isAbsolute && 'absolute z-50',
        'w-full',
        'max-h-[450px]',
        'overflow-y-auto',
      )}
    >
      {isLoading ? (
        <li className="pb-16 text-body2s text-gray-500">로딩중...</li>
      ) : items && items.length === 0 ? (
        <li className="pb-16 text-body2s text-gray-500">
          검색 결과가 존재하지 않습니다
        </li>
      ) : (
        items?.map((item, index) => (
          <li
            key={`${getDisplayName(item)}-${index}`}
            className={cn(
              'text-body2s',
              'pb-16',
              'cursor-pointer',
              localSelectedItems.some((i) => i === item)
                ? 'text-white'
                : 'text-gray-400',
              index < items.length - 1
                ? 'border-b-1 border-solid border-gray-600'
                : '',
            )}
            onClick={() => handleItemClick(item)}
          >
            {getDisplayName(item)}
            {getSubText && (
              <p className={cn('text-body3s')}>{getSubText(item)}</p>
            )}
          </li>
        ))
      )}
      <Button
        onClick={handleConfirm}
        disabled={localSelectedItems.length === 0}
      >
        확인
      </Button>
    </ul>
  );
}

export default SearchResults;
