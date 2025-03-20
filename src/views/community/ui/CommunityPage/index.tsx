'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { NavigationBar } from '@/entities/community';
import { SortType } from '@/shared/model/sportTypes';
import useSelectSport from '@/shared/model/useSelectSport';
import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import { CommunityItemContainer, CommunityToolbar } from '@/widgets/community';
import getBoardMock from '../Mock/getBoardMock';

const CommunityPage = () => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const boardMock = getBoardMock();
  const [selectedSort, setSelectedSort] = useState<SortType | null>(null);
  const { selectedSport, toggleSportSelection } = useSelectSport();

  const toggleSortSelection = (sort: SortType) => {
    setSelectedSort((prev) => (prev === sort ? null : sort));
  };

  const itemsPerPage = 7;
  const totalPairs = boardMock.info.totalPage;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBoardData = {
    info: boardMock.info,
    board: boardMock.board.slice(startIndex, startIndex + itemsPerPage),
  };

  return (
    <div
      className={cn('flex', 'w-full', 'justify-center', 'px-16', 'pb-[2.5rem]')}
    >
      <div
        className={cn(
          'w-full',
          'h-full',
          'flex',
          'flex-col',
          'justify-center',
          'items-center',
          'max-w-[1320px]',
          'gap-[2.5rem]',
          'pt-[2rem]',
        )}
      >
        <div
          className={cn('w-full', 'h-full', 'flex', 'flex-col', 'gap-[2rem]')}
        >
          <BackPageButton />
          <CommunityToolbar
            selectedSport={selectedSport}
            selectedSort={selectedSort}
            toggleSportSelection={toggleSportSelection}
            toggleSortSelection={toggleSortSelection}
          />
          <CommunityItemContainer boardData={currentBoardData} />
        </div>
        <NavigationBar totalPairs={totalPairs} />
      </div>
    </div>
  );
};

export default CommunityPage;
