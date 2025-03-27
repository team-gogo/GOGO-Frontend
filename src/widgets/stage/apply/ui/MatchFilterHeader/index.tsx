'use client';

import { useState } from 'react';
import { FilterButton } from '@/entities/community';
import { SportType } from '@/shared/model/sportTypes';
import CategoryTypeModal from '@/shared/ui/CategoryTypeModal';
import { cn } from '@/shared/utils/cn';

interface MatchFilterHeaderProps {
  stageName?: string;
  selectedSport: SportType | null;
  toggleSportSelection: (sport: SportType) => void;
}

const MatchFilterHeader = ({
  stageName,
  selectedSport,
  toggleSportSelection,
}: MatchFilterHeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categoryTypes: SportType[] = [
    'VOLLEY_BALL',
    'SOCCER',
    'LOL',
    'BASE_BALL',
    'BASKET_BALL',
    'BADMINTON',
    'ETC',
  ];

  return (
    <>
      <div className={cn('flex', 'w-full', 'justify-between', 'items-center')}>
        {stageName && (
          <h1 className={cn('text-h4e', 'text-white')}>{stageName}</h1>
        )}
        <FilterButton onClick={() => setIsModalOpen(true)} />
      </div>
      {isModalOpen && (
        <CategoryTypeModal
          onClose={() => setIsModalOpen(false)}
          selectedSport={selectedSport}
          toggleSportSelection={toggleSportSelection}
          categoryTypes={categoryTypes}
        />
      )}
    </>
  );
};

export default MatchFilterHeader;
