import React, { useState, useEffect } from 'react';
import { LineStroke } from '@/shared/assets/svg';
import CheckboxIcon from '@/shared/assets/svg/CheckboxIcon';
import Button from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';

interface SearchResultsProps<T> {
  items: T[] | null | undefined;
  isLoading: boolean;
  SearchinputValue: string;
  onSelect: (items: T[]) => void;
  getDisplayName: (item: T) => string;
  getSubText?: (item: T) => string;
  isAbsolute: boolean;
  multiSelect?: boolean;
  selectedItems?: T[];
  getItemId?: (item: T) => string | number;
  showCheckbox?: boolean;
  istotalSelect?: boolean;
  isDisabled?: boolean;
}

function SearchResults<T>({
  items,
  isLoading,
  SearchinputValue,
  onSelect,
  getDisplayName,
  getSubText,
  isAbsolute,
  multiSelect = false,
  selectedItems = [],
  getItemId = (item: T) => JSON.stringify(item),
  showCheckbox = false,
  istotalSelect = false,
  isDisabled = true,
}: SearchResultsProps<T>) {
  const [localSelectedItems, setLocalSelectedItems] =
    useState<T[]>(selectedItems);

  useEffect(() => {
    setLocalSelectedItems(selectedItems);
  }, [selectedItems]);

  const isItemSelected = (item: T) => {
    const itemId = getItemId(item);
    return localSelectedItems.some(
      (selectedItem) => getItemId(selectedItem) === itemId,
    );
  };

  const handleItemClick = (item: T) => {
    if (multiSelect) {
      setLocalSelectedItems((prev) => {
        const itemId = getItemId(item);
        const isSelected = prev.some((i) => getItemId(i) === itemId);

        if (isSelected) {
          return prev.filter((i) => getItemId(i) !== itemId);
        } else {
          return [...prev, item];
        }
      });
    } else {
      setLocalSelectedItems([item]);
    }
  };

  const handleConfirm = () => {
    const uniqueSelectedItems = localSelectedItems.filter(
      (item, index, self) =>
        index === self.findIndex((i) => getItemId(i) === getItemId(item)),
    );

    onSelect(uniqueSelectedItems);
  };

  const handleClearAll = () => {
    setLocalSelectedItems([]);
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
      ) : SearchinputValue.trim() === '' ? null : items &&
        items.length === 0 ? (
        <li className="pb-16 text-body2s text-gray-500">
          검색 결과가 존재하지 않습니다
        </li>
      ) : (
        items?.map((item, index) => (
          <li
            key={`${getItemId(item)}-${index}`}
            className={cn(
              'text-body2s',
              'pb-16',
              'cursor-pointer',
              'flex',
              'items-center',
              'gap-24',
              isItemSelected(item) ? 'text-white' : 'text-gray-400',
              index < (items?.length || 0) - 1
                ? 'border-b-1 border-solid border-gray-600'
                : '',
            )}
            onClick={() => handleItemClick(item)}
          >
            {showCheckbox && (
              <CheckboxIcon size={20} isChecked={isItemSelected(item)} />
            )}
            <div className={cn('flex', 'flex-col')}>
              {getDisplayName(item)}
              {getSubText && (
                <p className={cn('text-body3s')}>{getSubText(item)}</p>
              )}
            </div>
          </li>
        ))
      )}
      {istotalSelect && (
        <div className={cn('flex', 'items-center', 'gap-16', 'justify-end')}>
          <button
            type="button"
            className={cn('text-caption1s', 'text-gray-500')}
            onClick={handleClearAll}
          >
            전체지우기
          </button>
          <LineStroke />
          <div className={cn('flex', 'items-center', 'gap-12')}>
            <p className={cn('text-caption1s', 'text-gray-500')}>총 개수</p>
            <p className={cn('text-caption1s', 'text-white')}>
              {localSelectedItems.length}
            </p>
          </div>
        </div>
      )}

      <Button
        onClick={handleConfirm}
        disabled={isDisabled ? localSelectedItems.length === 0 : false}
      >
        확인
      </Button>
    </ul>
  );
}

export default SearchResults;
