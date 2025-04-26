import Link from 'next/link';
import { CommentIcon, HeartIcon, ViewsIcon } from '@/shared/assets/icons';
import { CommunityItemProps } from '@/shared/types/community';
import SportTypelabel from '@/shared/ui/sportTypelabel';
import { cn } from '@/shared/utils/cn';

interface CommunityItemsProps {
  item: CommunityItemProps;
  isMainUsed?: boolean;
  stageId: string;
  currentPage: number;
}

const CommunityItem = ({
  item,
  isMainUsed,
  stageId,
  currentPage,
}: CommunityItemsProps) => {
  const formatCount = (count: number) => {
    return count >= 100 ? '99+' : count.toString();
  };

  const { boardId, gameCategory, title, commentCount, likeCount, viewCount } =
    item;

  return (
    <Link
      href={`/community/${stageId}/detail/${boardId}?page=${currentPage}`}
      className={cn(
        'text-gray-600',
        'bg-gray-700',
        'text-body3s',
        isMainUsed ? 'px-[1rem]' : 'px-12',
        isMainUsed ? 'py-[0.75rem]' : 'py-16',
        'rounded-lg',
        'grid',
        'w-full',
        'tablet:grid-cols-[1fr_3fr_1fr_1fr]',
        'grid-cols-[1fr_3fr]',
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
          'hidden',
          'tablet:block',
        )}
      >
        익명
      </p>
      <div
        className={cn(
          'flex',
          'justify-center',
          'items-center',
          'gap-16',
          'hidden',
          'tablet:flex',
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
        <div className={cn('flex', 'items-center', 'gap-8')}>
          <ViewsIcon />
          <p className={cn('text-body3s', 'text-gray-300')}>{viewCount}</p>
        </div>
      </div>
    </Link>
  );
};

export default CommunityItem;
