'use client';

import { useState } from 'react';
import { FilterButton, Modal } from '@/entities/community';
import { SportType } from '@/shared/model/sportTypes';
import { cn } from '@/shared/utils/cn';

interface MatchFilterHeaderProps {
  stageName: string;
  selectedSport: SportType | null;
  toggleSportSelection: (sport: SportType) => void;
}

const MatchFilterHeader = ({
  stageName,
  selectedSport,
  toggleSportSelection,
}: MatchFilterHeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={cn('flex', 'w-full', 'justify-between', 'items-center')}>
        <h1 className={cn('text-h4e', 'text-white')}>{stageName}</h1>
        <FilterButton onClick={() => setIsModalOpen(true)} />
      </div>
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          selectedSport={selectedSport}
          toggleSportSelection={toggleSportSelection}
        />
      )}
    </>
  );
};

export default MatchFilterHeader;
