import { CommentIcon, HeartIcon } from '@/shared/assets/icons';
import { PersonIcon } from '@/shared/assets/svg';
import SportTypeLabel from '@/shared/ui/sportTypelabel';
import { cn } from '@/shared/utils/cn';

const CommunityContent = () => {
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
          <SportTypeLabel type="etc" />
          <p className={cn('text-body1e', 'text-gray-300')}>스테이지 이름</p>
          <div className={cn('flex', 'items-center', 'gap-8')}>
            <PersonIcon />
          </div>
        </div>
        <div className={cn('flex', 'flex-col', 'gap-16')}>
          <h1 className={cn('text-body2e', 'text-white')}>
            오늘 너무 디자인 하기 싫음
          </h1>
          <p className={cn('text-body3s', 'text-gray-300')}>
            오늘 너무 갑자기 하기 싫어짐 어떡함? 그냥 갈아 엎을 까? 해결 책
            좀..ㄹㅇ
          </p>
        </div>
      </div>
      <div className={cn('flex', 'items-center', 'justify-between')}>
        <div className={cn('flex', 'items-center', 'gap-16')}>
          <div className={cn('flex', 'items-center', 'gap-8')}>
            <CommentIcon />
            <p className={cn('text-gray-300', 'text-body3s')}>4</p>
          </div>
          <div className={cn('flex', 'items-center', 'gap-8')}>
            <HeartIcon />
            <p className={cn('text-gray-300', 'text-body3s')}>13</p>
          </div>
        </div>
        <p className={cn('text-body3s', 'text-gray-500')}>2025-03-08</p>
      </div>
    </div>
  );
};

export default CommunityContent;
