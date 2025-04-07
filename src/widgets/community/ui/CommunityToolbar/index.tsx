'use client';

import { useState } from 'react';
import { FilterButton, WriteButton } from '@/entities/community';
import { CommunityIcon } from '@/shared/assets/svg';
import { SportType, SortType } from '@/shared/model/sportTypes';
import CategoryTypeModal from '@/shared/ui/CategoryTypeModal';
import { cn } from '@/shared/utils/cn';

interface CommunityToolbarProps {
  selectedSport: SportType | null;
  selectedSort: SortType | null;
  toggleSportSelection: (sport: SportType) => void;
  toggleSortSelection: (sort: SortType) => void;
  stageId: string;
  categoryTypes: SportType[];
}

const CommunityToolbar = ({
  selectedSport,
  selectedSort,
  toggleSportSelection,
  toggleSortSelection,
  stageId,
  categoryTypes,
}: CommunityToolbarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={cn('flex', 'justify-between')}>
      <div className={cn('flex', 'items-center', 'gap-12')}>
        <CommunityIcon />
        <p
          className={cn(
            'text-white',
            'mobile:text-body1e',
            'text-body3e',
            'text-nowrap',
          )}
        >
          커뮤니티
        </p>
      </div>
      <div className={cn('flex', 'items-center', 'gap-12')}>
        <WriteButton stageId={stageId} />
        <FilterButton onClick={toggleModal} />
      </div>
      {isModalOpen && (
        <CategoryTypeModal
          onClose={toggleModal}
          selectedSport={selectedSport}
          selectedSort={selectedSort}
          toggleSportSelection={toggleSportSelection}
          toggleSortSelection={toggleSortSelection}
          categoryTypes={categoryTypes}
        />
      )}
    </div>
  );
};

export default CommunityToolbar;
