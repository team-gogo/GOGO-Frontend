import { cn } from '@/shared/utils/cn';

const RankingUserItem = () => {
  return (
    <div
      className={cn(
        'w-full',
        'h-[3.75rem]',
        'px-24',
        'py-12',
        'flex',
        'justify-between',
        'bg-gray-600',
        'rounded-lg',
      )}
    >
      <div className={cn('flex', 'items-center', 'gap-[2.5rem]')}>
        <p className={cn('text-white', 'text-body1e')}>4등</p>
        <p className={cn('text-gray-300', 'text-body2s')}>김진원</p>
      </div>
      <p className={cn('text-body1s', 'text-main-400')}>900P</p>
    </div>
  );
};

export default RankingUserItem;
