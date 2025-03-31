import { RightArrowIcon } from '@/shared/assets/svg';
import { ResponseStageGame } from '@/shared/types/community';
import SportTypeLabel from '@/shared/ui/sportTypelabel';
import { cn } from '@/shared/utils/cn';

interface MatchListSectionProps {
  stageInMatch: ResponseStageGame | undefined;
}

const MatchListSection = ({ stageInMatch }: MatchListSectionProps) => {
  return (
    <div className={cn('flex', 'w-full', 'gap-[1rem]', 'flex-col')}>
      {stageInMatch?.games.slice(0, 4).map((game) => (
        <div
          key={game.gameId}
          className={cn(
            'w-full',
            'flex',
            'flex-col',
            'px-[1rem]',
            'py-[0.75rem]',
            'rounded-xl',
            'bg-gray-700',
          )}
        >
          <div
            className={cn('flex', 'justify-between', 'w-full', 'items-center')}
          >
            <SportTypeLabel
              type={game.category}
              isHaveBorder={true}
              isMainUsed={true}
            />
            <p className={cn('text-body3s', 'text-white')}>{game.gameName}</p>
            <button className={cn('flex', 'gap-[0.5rem]', 'items-center')}>
              <p className={cn('text-caption1s', 'text-gray-300')}>
                자세히보기
              </p>
              <RightArrowIcon size="1.25rem" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchListSection;
