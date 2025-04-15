import { useState } from 'react';
import {
  CommunityHeader,
  CommunityItem,
  NavigationBar,
} from '@/entities/community';
import { SortType, SportType } from '@/shared/model/sportTypes';
import { cn } from '@/shared/utils/cn';
import { useGetCommunityQuery } from '../../model/useGetCommunityQuery';

interface CommunityItemProps {
  isMainUsed?: boolean;
  stageId: string;
  selectedSport?: SportType | null;
  selectedSort?: SortType | null;
  initialPage?: number;
}

const CommunityItemContainer = ({
  isMainUsed = false,
  stageId,
  selectedSport,
  selectedSort,
  initialPage = 1,
}: CommunityItemProps) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const { data, isLoading, error } = useGetCommunityQuery(
    stageId,
    currentPage,
    selectedSport,
    selectedSort,
  );

  const boardItems = isMainUsed ? data?.board?.slice(0, 4) : data?.board;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const totalPage = data?.info?.totalPage ?? 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div
      className={cn(
        'flex',
        'flex-col',
        'items-center',
        'gap-[2.5rem]',
        'w-full',
      )}
    >
      <div className={cn('w-full', 'space-y-12')}>
        {!isMainUsed && <CommunityHeader />}
        <div className={cn('space-y-16')}>
          {boardItems?.map((item) => (
            <CommunityItem
              key={item.boardId}
              item={item}
              isMainUsed={isMainUsed}
              stageId={stageId}
              currentPage={currentPage}
            />
          ))}
        </div>
      </div>
      {!isMainUsed && (
        <NavigationBar
          totalPairs={totalPage}
          stageId={stageId}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default CommunityItemContainer;
