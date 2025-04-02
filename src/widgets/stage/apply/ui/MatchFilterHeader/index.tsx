'use client';

import { useState } from 'react';
import { FilterButton } from '@/entities/community';
import { SportType } from '@/shared/model/sportTypes';
import CategoryTypeModal from '@/shared/ui/CategoryTypeModal';

interface MatchFilterHeaderProps {
  selectedSport: SportType | null;
  toggleSportSelection: (sport: SportType) => void;
}

const MatchFilterHeader = ({
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
      <div>
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
