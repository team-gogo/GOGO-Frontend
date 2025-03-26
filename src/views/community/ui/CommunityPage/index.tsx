'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useCategoryTypes } from '@/entities/community/model/useCategoryTypes';
import useSelectSort from '@/shared/model/useSelectSort';
import useSelectSport from '@/shared/model/useSelectSport';
import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import { CommunityItemContainer, CommunityToolbar } from '@/widgets/community';

const CommunityPage = () => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const params = useParams<{ stageId: string }>();
  const { stageId } = params;

  const { selectedSort, toggleSortSelection } = useSelectSort();
  const { selectedSport, toggleSportSelection } = useSelectSport();

  const { categoryTypes } = useCategoryTypes(stageId);

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
        )}
      >
        <div
          className={cn(
            'w-full',
            'h-full',
            'pt-[2.25rem]',
            'flex',
            'flex-col',
            'gap-[2rem]',
          )}
        >
          <BackPageButton type="push" path={`/${stageId}`} />
          <CommunityToolbar
            selectedSport={selectedSport}
            selectedSort={selectedSort}
            toggleSportSelection={toggleSportSelection}
            toggleSortSelection={toggleSortSelection}
            stageId={stageId}
            categoryTypes={categoryTypes}
          />
          <CommunityItemContainer
            stageId={stageId}
            selectedSport={selectedSport}
            selectedSort={selectedSort}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
