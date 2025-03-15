import { CommunityHeader, CommunityItem } from '@/entities/community';
import { cn } from '@/shared/utils/cn';
import { getBoardMock } from '../../Mock/getBoardMock';

interface CommunityItemProps {
  isMainUsed?: boolean;
}

const CommunityItemContainer = ({ isMainUsed = false }: CommunityItemProps) => {
  const BoardData = getBoardMock();

  const itemsToDisplay = isMainUsed
    ? BoardData.board.slice(0, 4)
    : BoardData.board;

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
