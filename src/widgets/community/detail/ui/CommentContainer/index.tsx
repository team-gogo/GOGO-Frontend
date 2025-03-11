import { CommentItem } from '@/entities/community/detail';
import { Comment } from '@/shared/types/community/detail';
import { cn } from '@/shared/utils/cn';

interface CommentContainerProps {
  comments: Comment[];
}

const CommentContainer = ({ comments }: CommentContainerProps) => {
  return (
    <div className={cn('space-y-24')}>
      <p className={cn('text-body1e', 'text-white')}>댓글</p>
      <div className={cn('space-y-20')}>
        {comments.map((comment) => (
          <CommentItem
            key={comment.commentId}
            authorName={comment.author.name}
            comment={comment.comment}
            likeCount={comment.likeCount}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentContainer;
