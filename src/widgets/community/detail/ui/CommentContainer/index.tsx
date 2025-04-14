import { useState } from 'react';
import { CommentItem } from '@/entities/community/detail';
import { SortType } from '@/shared/model/sportTypes';
import { Comment } from '@/shared/types/community/detail';
import SportTypeLabel from '@/shared/ui/sportTypelabel';
import { cn } from '@/shared/utils/cn';
interface CommentContainerProps {
  boardId: string;
  comments: Comment[];
}

const CommentContainer = ({ boardId, comments }: CommentContainerProps) => {
  const [selectedSort, setSelectedSort] = useState<SortType>('LATEST');

  const handleSortClick = (sort: SortType) => {
    setSelectedSort(sort === 'LATEST' ? 'LAST' : 'LATEST');
  };

  return (
    <div className={cn('space-y-24', 'min-h-[16.25rem]', 'flex', 'flex-col')}>
      <div className={cn('flex', 'justify-between')}>
        <p className={cn('text-body1e', 'text-white')}>댓글</p>
        <SportTypeLabel
          type={selectedSort}
          isHaveBorder={true}
          onClick={() => handleSortClick(selectedSort)}
          isSelected={false}
          asButton={true}
        />
      </div>
      <div
        className={cn(
          'space-y-20',
          'flex-1',
          'flex',
          'items-center',
          'flex-col',
        )}
      >
        {comments.length === 0 ? (
          <p className={cn('text-body1s', 'text-gray-500')}>
            첫 댓글을 달아보세요!
          </p>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.commentId}
              authorName={comment.author.name}
              content={comment.content}
              likeCount={comment.likeCount}
              commentId={comment.commentId}
              isLiked={comment.isLiked}
              boardId={boardId}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentContainer;
