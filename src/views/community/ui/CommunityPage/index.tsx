'use client';

import { useState } from 'react';
import { SportType, SortType } from '@/shared/model/sportTypes';
import { cn } from '@/shared/utils/cn';
import { CommunityItemContainer, CommunityToolbar } from '@/widgets/community';

const CommunityPage = () => {
  const [selectedSport, setSelectedSport] = useState<SportType | null>(null);
  const [selectedSort, setSelectedSort] = useState<SortType | null>(null);

  const toggleSportSelection = (sport: SportType) => {
    setSelectedSport((prev) => (prev === sport ? null : sport));
  };

  const toggleSortSelection = (sort: SortType) => {
    setSelectedSort((prev) => (prev === sort ? null : sort));
  };

  return (
    <div className={cn('flex', 'w-full', 'justify-center', 'px-16', 'pb-16')}>
      <div
        className={cn(
          'w-full',
          'h-full',
          'max-w-[1320px]',
          'space-y-[36px]',
          'pt-[40px]',
        )}
      >
        <CommunityToolbar
          selectedSport={selectedSport}
          selectedSort={selectedSort}
          toggleSportSelection={toggleSportSelection}
          toggleSortSelection={toggleSortSelection}
        />
        <CommunityItemContainer />
      </div>
    </div>
  );
};

export default CommunityPage;
