import { cn } from '@/shared/utils/cn';

interface Team {
  teamName: string;
  bettingPoint: number;
}

interface MatchTeamProps {
  team: Team;
  percentage: number;
  bgColor: string;
}

const MatchTeam = ({ team, percentage, bgColor }: MatchTeamProps) => {
  return (
    <div
      className={cn(
        'h-[21.75rem]',
        'flex',
        'flex-col',
        'justify-end',
        'gap-[1.5rem]',
      )}
    >
      <div className={cn('flex', 'flex-col', 'items-center', 'gap-[0.5rem]')}>
        <p className={cn('text-body2s', 'text-gray-300')}>
          {team.bettingPoint}P
        </p>
        <h1 className={cn('text-h1e', 'text-white')}>{team.teamName}팀</h1>
      </div>
      <div
        className={cn(
          'flex',
          'h-full',
          'max-h-[15rem]',
          'max-w-[7.5rem]',
          'flex-col',
          'justify-center',
          'items-center',
          'rounded-xl',
          'bg-gray-500',
          bgColor,
        )}
        style={{
          height: `${percentage}%`,
          flexShrink: 0,
        }}
      >
        <p className={cn('text-body1e', 'text-white')}>{percentage}%</p>
      </div>
    </div>
  );
};

export default MatchTeam;
