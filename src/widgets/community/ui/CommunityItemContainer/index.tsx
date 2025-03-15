import { CommunityHeader, CommunityItem } from '@/entities/community';
import { BoardData } from '@/shared/types/community';
import { cn } from '@/shared/utils/cn';

interface CommunityItemProps {
  boardData: BoardData;
}

const CommunityItemContainer = ({ boardData }: CommunityItemProps) => {
  return (
    <div className={cn('w-full', 'space-y-12')}>
      <CommunityHeader />
      <div className={cn('space-y-16')}>
        {boardData.board.map((item) => (
          <CommunityItem key={item.boardId} {...item} />
        ))}
      </div>
    </div>
  );
};

export default CommunityItemContainer;
