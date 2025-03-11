import { CommunityHeader, CommunityItem } from '@/entities/community';
import { cn } from '@/shared/utils/cn';
import { getBoardMock } from '../../Mock/getBoardMock';

const CommunityItemContainer = () => {
  const BoardData = getBoardMock();
  return (
    <div className={cn('w-full', 'space-y-12')}>
      <CommunityHeader />
      <div className={cn('space-y-16')}>
        {BoardData.board.map((item) => (
          <CommunityItem key={item.boardId} {...item} />
        ))}
      </div>
    </div>
  );
};

export default CommunityItemContainer;
