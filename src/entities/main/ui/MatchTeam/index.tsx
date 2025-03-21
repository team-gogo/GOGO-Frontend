import { cn } from '@/shared/utils/cn';

interface Team {
  teamName: string;
  bettingPoint: number;
}

interface MatchTeamProps {
  team: Team;
  percentage: number;
  bgColor: string;
  onClick: () => void;
}

const MatchTeam = ({ team, percentage, bgColor, onClick }: MatchTeamProps) => {
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
      <button
        onClick={onClick}
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
      </button>
    </div>
  );
};

export default MatchTeam;
