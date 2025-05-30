'use client';

import React from 'react';
import { WarningIcon } from '@/shared/assets/svg';
import { SortType, SportType } from '@/shared/model/sportTypes';
import ModalLayout from '@/shared/ui/modalLayout';
import SportTypeLabel from '@/shared/ui/sportTypelabel';
import { cn } from '@/shared/utils/cn';

interface ModalProps {
  onClose: () => void;
  selectedSport: SportType | null;
  selectedSort?: SortType | null;
  toggleSportSelection: (sport: SportType) => void;
  toggleSortSelection?: (sort: SortType) => void;
  categoryTypes: SportType[];
}

const CategoryTypeModal = ({
  onClose,
  selectedSport,
  selectedSort,
  toggleSportSelection,
  toggleSortSelection,
  categoryTypes,
}: ModalProps) => {
  const sortTypes: SortType[] = ['LATEST', 'LAST'];

  return (
    <ModalLayout
      title="필터"
      onClose={onClose}
      containerClassName={cn(
        'rounded-lg',
        'bg-gray-700',
        'px-[40px]',
        'py-[36px]',
        'max-w-[52.5rem]',
        'w-full',
        'space-y-24',
      )}
    >
      <div className={cn('flex', 'flex-wrap', 'gap-y-12', 'gap-x-16')}>
        {categoryTypes.map((sport) => (
          <SportTypeLabel
            key={sport}
            type={sport}
            asButton
            isSelected={selectedSport === sport}
            onClick={() => toggleSportSelection(sport)}
            isHaveBorder={true}
          />
        ))}
      </div>

      <div className="my-6 h-[1px] w-full bg-gray-600" />

      {selectedSort !== undefined && toggleSortSelection && (
        <div className={cn('flex', 'flex-wrap', 'gap-y-12', 'gap-x-16')}>
          {sortTypes.map((sort) => (
            <SportTypeLabel
              key={sort}
              type={sort}
              asButton
              isSelected={selectedSort === sort}
              onClick={() => toggleSortSelection(sort)}
              isHaveBorder={true}
            />
          ))}
        </div>
      )}

      <div className={cn('flex', 'gap-8', 'items-center')}>
        <WarningIcon />
        <p className={cn('text-caption1s', 'text-gray-500')}>
          한 개씩 선택이 가능합니다.
        </p>
      </div>
    </ModalLayout>
  );
};

export default CategoryTypeModal;
