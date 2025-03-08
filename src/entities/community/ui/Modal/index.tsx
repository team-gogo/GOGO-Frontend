'use client';

import React from 'react';
import ModalLayout from '@/shared/ui/modalLayout';
import SportTypeLabel from '@/shared/ui/sportTypelabel';
import { cn } from '@/shared/utils/cn';

interface ModalProps {
  onClose: () => void;
  selectedSport: string | null;
  selectedSort: string | null;
  toggleSportSelection: (sport: string) => void;
  toggleSortSelection: (sort: string) => void;
}

const Modal = ({
  onClose,
  selectedSport,
  selectedSort,
  toggleSportSelection,
  toggleSortSelection,
}: ModalProps) => {
  const options = [
    { type: 'volleyball', category: 'sport' },
    { type: 'soccer', category: 'sport' },
    { type: 'lol', category: 'sport' },
    { type: 'baseball', category: 'sport' },
    { type: 'badminton', category: 'sport' },
    { type: 'etc', category: 'sport' },
    { type: 'newest', category: 'sort' },
    { type: 'oldest', category: 'sort' },
  ];

  return (
    <ModalLayout
      title="필터"
      onClose={onClose}
      containerClassName={cn(
        'rounded-lg',
        'bg-gray-700',
        'px-[40px]',
        'py-[36px]',
        'max-w-[571px]',
        'w-full',
        'space-y-24',
      )}
    >
      <div className={cn('flex', 'flex-wrap', 'gap-y-12', 'gap-x-16')}>
        {options.map(({ type, category }) => (
          <SportTypeLabel
            key={type}
            type={type}
            asButton
            isSelected={
              category === 'sport'
                ? selectedSport === type
                : selectedSort === type
            }
            onClick={() =>
              category === 'sport'
                ? toggleSportSelection(type)
                : toggleSortSelection(type)
            }
          />
        ))}
      </div>
    </ModalLayout>
  );
};

export default Modal;
