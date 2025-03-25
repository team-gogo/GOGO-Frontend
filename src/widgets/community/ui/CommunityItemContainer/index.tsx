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
  selectedSport: SportType | null;
  selectedSort: SortType | null;
  currentPage: number;
}

const CommunityItemContainer = ({
  isMainUsed = false,
  stageId,
  selectedSport,
  selectedSort,
  currentPage,
}: CommunityItemProps) => {
  const { data, isLoading, error } = useGetCommunityQuery(
    stageId,
    selectedSport,
    selectedSort,
    currentPage,
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const totalPage = data?.info?.totalPage ?? 1;

  return (
    <div className={cn('flex', 'flex-col', 'items-center', 'gap-[2.5rem]')}>
      <div className={cn('w-full', 'space-y-12')}>
        {!isMainUsed && <CommunityHeader />}
        <div className={cn('space-y-16')}>
          {data?.board?.map((item) => (
            <CommunityItem
              key={item.boardId}
              item={item}
              isMainUsed={isMainUsed}
            />
          ))}
        </div>
      </div>
      <NavigationBar totalPairs={totalPage} stageId={stageId} />
    </div>
  );
};

export default CommunityItemContainer;
