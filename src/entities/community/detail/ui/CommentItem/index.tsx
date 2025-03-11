import { HeartIcon } from '@/shared/assets/icons';
import { PersonIcon } from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';

interface CommentItemProps {
  authorName: string;
  comment: string;
  likeCount: number;
}

const CommentItem = ({ authorName, comment, likeCount }: CommentItemProps) => {
  return (
    <div
      className={cn(
        'flex',
        'bg-gray-700',
        'items-center',
        'w-full',
        'px-20',
        'py-16',
        'rounded-lg',
        'justify-between',
      )}
    >
      <div className={cn('flex', 'items-center', 'gap-8', 'whitespace-nowrap')}>
        <PersonIcon />
        <p className={cn('text-body3s', 'text-gray-300')}>{authorName}</p>
      </div>

      <p className={cn('text-body3s', 'text-white', 'flex-grow', 'px-24')}>
        {comment}
      </p>
      <div className={cn('flex', 'items-center', 'gap-8')}>
        <HeartIcon />
        <p className={cn('text-body3s', 'text-gray-300')}>{likeCount}</p>
      </div>
    </div>
  );
};

export default CommentItem;
