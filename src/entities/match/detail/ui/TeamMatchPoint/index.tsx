import { PointCircleIcon } from '@/shared/assets/svg';
import { TeamType } from '@/shared/types/my/bet';
import { cn } from '@/shared/utils/cn';

interface TeamMatchPointProps {
  team: TeamType;
  isPredicted: boolean;
}

const TeamMatchPoint = ({ team, isPredicted }: TeamMatchPointProps) => {
  return (
    <div
      className={cn(
        'flex',
        'flex-col',
        'justify-center',
        'items-center',
        'gap-[0.75rem]',
        'h-full',
      )}
    >
      <div className={cn('flex', 'items-center', 'gap-[0.25rem]', 'h-full')}>
        <PointCircleIcon color={!isPredicted ? '#A6A6A6' : '#526FFE'} />
        <p
          className={cn(
            'text-body3s',
            !isPredicted ? 'text-gray-300' : 'text-main-500',
          )}
        >
          {team.bettingPoint}
        </p>
      </div>
      <h2
        className={cn(
          'text-h1e',
          !isPredicted ? 'text-white' : 'text-main-500',
        )}
      >
        {team.teamName}
      </h2>
    </div>
  );
};

export default TeamMatchPoint;
