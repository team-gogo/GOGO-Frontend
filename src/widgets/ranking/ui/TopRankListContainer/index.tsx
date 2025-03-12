import { TopRankListItem } from '@/entities/ranking';
import { cn } from '@/shared/utils/cn';

const TopRankListContainer = () => {
  return (
    <div
      className={cn(
        'w-full',
        'border-4',
        'border-solid',
        'border-gray-600',
        'h-[18.25rem]',
        'rounded-lg',
      )}
    >
      <p className={cn('text-white', 'text-h3e')}>awdwd</p>
      <div className={cn('flex', 'justify-evenly')}>
        <TopRankListItem />
        <TopRankListItem />
        <TopRankListItem />
      </div>
    </div>
  );
};

export default TopRankListContainer;
