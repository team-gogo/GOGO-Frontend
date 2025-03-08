'use client';

import { useState } from 'react';
import { Modal } from '@/entities/community';
import { CommunityIcon } from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';
import FilterButton from '../../../../entities/community/ui/FilterButton';
import WriteButton from '../../../../entities/community/ui/WriteButton';

interface CommunityToolbarProps {
  selectedSport: string | null;
  selectedSort: string | null;
  toggleSportSelection: (sport: string) => void;
  toggleSortSelection: (sort: string) => void;
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
