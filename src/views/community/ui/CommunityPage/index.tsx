'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { NavigationBar } from '@/entities/community';
import useSelectSort from '@/shared/model/useSelectSort';
import useSelectSport from '@/shared/model/useSelectSport';
import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import { CommunityItemContainer, CommunityToolbar } from '@/widgets/community';
import { useGetCommunityQuery } from '../../model/useGetCommunityQuery';

const CommunityPage = () => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const { stageId } = useParams();
  const safeStageId = Array.isArray(stageId) ? stageId[0] : stageId || '';

  const { selectedSort, toggleSortSelection } = useSelectSort();
  const { selectedSport, toggleSportSelection } = useSelectSport();

  const { data } = useGetCommunityQuery(
    safeStageId,
    selectedSport,
    selectedSort,
    currentPage,
  );

  const itemsPerPage = 7;
  const totalPairs = data?.info?.totalPage || 0;

  const currentBoardData = data
    ? {
        info: data.info,
        board: data.board.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage,
        ),
      }
    : {
        info: {
          totalPage: 0,
          totalElement: 0,
        },
        board: [],
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
            stageId={safeStageId}
          />
          <CommunityItemContainer boardData={currentBoardData} />
        </div>
        <NavigationBar stageId={safeStageId} totalPairs={totalPairs} />
      </div>
    </div>
  );
};

export default CommunityPage;
