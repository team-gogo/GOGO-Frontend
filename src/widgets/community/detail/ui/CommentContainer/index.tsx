import { CommentItem } from '@/entities/community/detail';
import { Comment } from '@/shared/types/community/detail';
import { cn } from '@/shared/utils/cn';

interface CommentContainerProps {
  comments: Comment[];
}

const CommentContainer = ({ comments }: CommentContainerProps) => {
  return (
    <div className={cn('space-y-24', 'min-h-[16.25rem]', 'flex', 'flex-col')}>
      <p className={cn('text-body1e', 'text-white')}>댓글</p>
      <div
        className={cn(
          'space-y-20',
          'flex-1',
          'flex',
          'items-center',
          'justify-center',
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
              comment={comment.comment}
              likeCount={comment.likeCount}
              commentId={comment.commentId}
              isLiked={comment.isLiked}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentContainer;
