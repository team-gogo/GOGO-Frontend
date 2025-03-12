import { PointIcon, RankBar } from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';

const TopRankListItem = () => {
  return (
    <div className={cn('flex', 'flex-col', 'items-center', 'space-y-4')}>
      <div className={cn('flex', 'items-center', 'justify-center', 'gap-4')}>
        <p className={cn('text-caption1s', 'text-main-400')}>1500</p>
        <PointIcon size={16} fill="#748CFE" />
      </div>
      <p className={cn('text-white', 'text-body2e')}>김진원</p>
      <RankBar />
    </div>
  );
};

export default TopRankListItem;
