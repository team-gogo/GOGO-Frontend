import { RankingUserItem } from '@/entities/ranking';
import { cn } from '@/shared/utils/cn';

const RankingUserContainer = () => {
  return (
    <div
      className={cn(
        'w-fulll',
        'rounded-lg',
        'bg-gray-700',
        'flex',
        'flex-col',
        'gap-16',
        'items-center',
        'justify-center',
        'py-24',
        'px-20',
      )}
    >
      <RankingUserItem />
      <RankingUserItem />
      <RankingUserItem />
      <RankingUserItem />
      <RankingUserItem />
    </div>
  );
};

export default RankingUserContainer;
