import { cn } from '@/shared/utils/cn';

const CommunityHeader = () => {
  return (
    <div
      className={cn(
        'grid',
        'w-full',
        'grid-cols-[1fr_3fr_1fr_1fr]',
        'px-16',
        'font-bold',
        'text-gray-600',
        'text-body3s',
        'pb-16',
        'border-b-1',
        'border-solid',
        'border-gray-700',
        'px-16',
        'tablet:grid-cols-[1fr_3fr]',
        'mobile:',
      )}
    >
      <div className={cn('text-center')}>운동 종류</div>
      <div className={cn('text-center')}>제목</div>
      <div className={cn('text-center tablet:hidden')}>이름</div>
      <div className={cn('text-center tablet:hidden')}>좋아요 & 댓글</div>
    </div>
  );
};

export default CommunityHeader;
