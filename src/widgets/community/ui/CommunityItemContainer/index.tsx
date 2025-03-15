import { CommunityHeader, CommunityItem } from '@/entities/community';
import { BoardData } from '@/shared/types/community';
import { cn } from '@/shared/utils/cn';

interface CommunityItemProps {
  isMainUsed?: boolean;
  boardData: BoardData;
}

const CommunityItemContainer = ({
  isMainUsed = false,
  boardData,
}: CommunityItemProps) => {
  const itemsToDisplay = isMainUsed
    ? boardData.board.slice(0, 4)
    : boardData.board;

  return (
    <div className={cn('w-full', 'space-y-12')}>
      {!isMainUsed && <CommunityHeader />}
      <div className={cn('space-y-16')}>
        {itemsToDisplay.map((item) => (
          <CommunityItem
            key={item.boardId}
            item={item}
            isMainUsed={isMainUsed}
          />
        ))}
      </div>
    </div>
  );
};

export default CommunityItemContainer;
