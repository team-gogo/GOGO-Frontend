'use client';

import { useState } from 'react';
import { FilterButton, Modal, WriteButton } from '@/entities/community';
import { CommunityIcon } from '@/shared/assets/svg';
import { SportType, SortType } from '@/shared/model/sportTypes';
import { cn } from '@/shared/utils/cn';

interface CommunityToolbarProps {
  selectedSport: SportType | null;
  selectedSort: SortType | null;
  toggleSportSelection: (sport: SportType) => void;
  toggleSortSelection: (sort: SortType) => void;
}

const CommunityToolbar = ({
  selectedSport,
  selectedSort,
  toggleSportSelection,
  toggleSortSelection,
}: CommunityToolbarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={cn('flex', 'gap-[32px]', 'justify-between')}>
      <div className={cn('flex', 'items-center', 'gap-12')}>
        <CommunityIcon />
        <p
          className={cn(
            'text-white',
            'text-body1e',
            'mobile:text-body3e',
            'text-nowrap',
          )}
        >
          커뮤니티
        </p>
      </div>
      <div className={cn('flex', 'items-center', 'gap-12')}>
        <WriteButton />
        <FilterButton onClick={toggleModal} />
      </div>
      {isModalOpen && (
        <Modal
          onClose={toggleModal}
          selectedSport={selectedSport}
          selectedSort={selectedSort}
          toggleSportSelection={toggleSportSelection}
          toggleSortSelection={toggleSortSelection}
        />
      )}
    </div>
  );
};

export default CommunityToolbar;
