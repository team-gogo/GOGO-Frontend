import { CommentIcon, HeartIcon } from '@/shared/assets/icons';
import { PersonIcon } from '@/shared/assets/svg';
import { formatIsoDate } from '@/shared/model/formatIsoDate';
import SportTypeLabel from '@/shared/ui/sportTypelabel';
import { cn } from '@/shared/utils/cn';

interface CommunityContentProps {
  title: string;
  content: string;
  authorName: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  stageCategory: string;
  stageName: string;
}

const CommunityContent = ({
  title,
  content,
  authorName,
  likeCount,
  commentCount,
  createdAt,
  stageCategory,
  stageName,
}: CommunityContentProps) => {
  return (
    <div
      className={cn(
        'px-24',
        'py-20',
        'bg-gray-700',
        'rounded-lg',
        'space-y-[44px]',
      )}
    >
      <div className={cn('space-y-24')}>
        <div className={cn('flex', 'items-center', 'gap-24')}>
          <SportTypeLabel type={stageCategory} />
          <p className={cn('text-body1e', 'text-gray-300')}>{stageName}</p>
          <div className={cn('flex', 'items-center', 'gap-8')}>
            <PersonIcon />
            <p className={cn('text-body3s', 'text-gray-300')}>{authorName}</p>
          </div>
        </div>
        <div className={cn('flex', 'flex-col', 'gap-16')}>
          <h1 className={cn('text-body2e', 'text-white')}>{title}</h1>
          <p className={cn('text-body3s', 'text-gray-300')}>{content}</p>
        </div>
      </div>
      <div className={cn('flex', 'items-center', 'justify-between')}>
        <div className={cn('flex', 'items-center', 'gap-16')}>
          <div className={cn('flex', 'items-center', 'gap-8')}>
            <CommentIcon />
            <p className={cn('text-gray-300', 'text-body3s')}>{commentCount}</p>
          </div>
          <div className={cn('flex', 'items-center', 'gap-8')}>
            <HeartIcon />
            <p className={cn('text-gray-300', 'text-body3s')}>{likeCount}</p>
          </div>
        </div>
        <p className={cn('text-body3s', 'text-gray-500')}>
          {formatIsoDate(createdAt)}
        </p>
      </div>
    </div>
  );
};

export default CommunityContent;
