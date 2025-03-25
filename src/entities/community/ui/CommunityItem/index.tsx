import Link from 'next/link';
import { CommentIcon, HeartIcon } from '@/shared/assets/icons';
import { CommunityItemProps } from '@/shared/types/community';
import SportTypelabel from '@/shared/ui/sportTypelabel';
import { cn } from '@/shared/utils/cn';

interface CommunityItemsProps {
  item: CommunityItemProps;
  isMainUsed?: boolean;
}

const CommunityItem = ({ item, isMainUsed }: CommunityItemsProps) => {
  const formatCount = (count: number) => {
    return count >= 100 ? '99+' : count.toString();
  };

  const { boardId, gameCategory, title, author, commentCount, likeCount } =
    item;

  console.log(gameCategory);

  return (
    <Link
      href={`/community/detail/${boardId}`}
      className={cn(
        'text-gray-600',
        'bg-gray-700',
        'text-body3s',
        isMainUsed ? 'py-[1rem]' : 'py-12',
        isMainUsed ? 'py-[0.75rem]' : 'px-16',
        'rounded-lg',
        'grid',
        'w-full',
        'grid-cols-[1fr_3fr_1fr_1fr]',
        'tablet:grid-cols-[1fr_3fr]',
        'items-center',
      )}
    >
      <div className={cn('flex', 'items-center', 'justify-center')}>
        <SportTypelabel
          type={gameCategory}
          isMainUsed={isMainUsed}
          isHaveBorder={true}
        />
      </div>
      <p
        className={cn(
          'text-white',
          'text-body3s',
          'text-center',
          'overflow-hidden',
          'text-ellipsis',
          'whitespace-nowrap',
          'max-w-full',
        )}
      >
        {title}
      </p>
      <p
        className={cn(
          'text-gray-300',
          'text-body2s',
          'text-center',
          'tablet:hidden',
        )}
      >
        {author.name}
      </p>
      <div
        className={cn(
          'flex',
          'justify-center',
          'items-center',
          'gap-16',
          'tablet:hidden',
        )}
      >
        <div className={cn('flex', 'items-center', 'gap-8')}>
          <CommentIcon />
          <p className={cn('text-body3s', 'text-gray-300')}>{commentCount}</p>
        </div>
        <div className={cn('flex', 'items-center', 'gap-8')}>
          <HeartIcon />
          <p className={cn('text-body3s', 'text-gray-300')}>
            {formatCount(likeCount)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CommunityItem;
