import { useState, useMemo } from 'react';
import { CommentItem } from '@/entities/community/detail';
import SortDropdown from '@/entities/community/detail/ui/SortDropdown';
import { SortType } from '@/shared/model/sportTypes';
import { Comment } from '@/shared/types/community/detail';
import { cn } from '@/shared/utils/cn';

interface CommentContainerProps {
  boardId: string;
  comments: Comment[];
}

const CommentContainer = ({ boardId, comments }: CommentContainerProps) => {
  const [selectedSort, setSelectedSort] = useState<SortType>('LATEST');

  const sortedComments = useMemo(() => {
    return [...comments].sort((a, b) => {
      if (selectedSort === 'LATEST') {
        return Number(b.commentId) - Number(a.commentId);
      } else if (selectedSort === 'LAST') {
        return Number(a.commentId) - Number(b.commentId);
      } else {
        return b.likeCount - a.likeCount;
      }
    });
  }, [comments, selectedSort]);

  return (
    <div className={cn('space-y-24', 'min-h-[16.25rem]', 'flex', 'flex-col')}>
      <div className={cn('flex', 'justify-between')}>
        <p className={cn('text-body1e', 'text-white')}>댓글</p>
        <SortDropdown
          selectedSort={selectedSort}
          onSortSelect={setSelectedSort}
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
        {sortedComments.length === 0 ? (
          <p className={cn('text-body1s', 'text-gray-500')}>
            첫 댓글을 달아보세요!
          </p>
        ) : (
          sortedComments.map((comment) => (
            <CommentItem
              key={comment.commentId}
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
