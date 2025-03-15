import { MatchGameType } from '@/shared/types/stage/apply';
import Button from '@/shared/ui/button';
import MatchTypeLabel from '@/shared/ui/matchTypeLabel';
import SportTypeLabel from '@/shared/ui/sportTypelabel';
import { cn } from '@/shared/utils/cn';

interface StageApplyProps {
  game: MatchGameType;
}

const StageApply = ({ game }: StageApplyProps) => {
  const { gameName, teamCount, category, isParticipating } = game;

  return (
    <div
      className={cn(
        'flex',
        'flex-col',
        'p-[1.5rem]',
        'px-[2rem]',
        'rounded-xl',
        'bg-gray-700',
        'max-w-[40rem]',
        'w-full',
        'h-full',
      )}
    >
      <div
        className={cn(
          'flex',
          'flex-col',
          'justify-center',
          'gap-[3rem]',
          'flex-grow',
        )}
      >
        <div
          className={cn('flex', 'w-full', 'justify-between', 'items-center')}
        >
          <div className={cn('flex', 'items-center', 'gap-[1.5rem]')}>
            <SportTypeLabel type={category[0]} />
            <MatchTypeLabel
              type={'TEAM'}
              customText={String(teamCount)}
              color="#97A9FF"
            />
          </div>
        </div>
        <div
          className={cn(
            'flex',
            'w-full',
            'flex-col',
            'items-center',
            'gap-[3rem]',
          )}
        >
          <h1 className={cn('text-body1e', 'text-white', 'laptop:text-body2e')}>
            {gameName}
          </h1>
          <div className={cn('flex', 'w-full', 'justify-center')}>
            <Button disabled={isParticipating}>신청하기</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StageApply;
