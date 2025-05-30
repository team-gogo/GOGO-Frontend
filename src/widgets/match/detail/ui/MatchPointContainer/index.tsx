import TeamMatchPoint from '@/entities/match/detail/ui/TeamMatchPoint';
import { PointCircleIcon } from '@/shared/assets/svg';
import { BetType, TeamType } from '@/shared/types/my/bet';
import { cn } from '@/shared/utils/cn';

interface MatchPointProps {
  ateam: TeamType;
  bteam: TeamType;
  betting: BetType;
}

interface MatchPointProps {
  ateam: TeamType;
  bteam: TeamType;
  betting: BetType;
}

const MatchPointContainer = ({ ateam, bteam, betting }: MatchPointProps) => {
  return (
    <div
      className={cn(
        'flex',
        'items-center',
        'laptop:gap-[5rem]',
        'pad:gap-[1rem]',
        'gap-0',
        'pad:h-[6.875rem]',
        'h-[4rem]',
      )}
    >
      <TeamMatchPoint
        team={ateam}
        isPredicted={betting.predictedWinTeamId === ateam.teamId}
      />

      <div
        className={cn(
          'flex',
          'flex-col',
          'justify-center',
          'items-center',
          'gap-[0.5rem]',
        )}
      >
        <p className={cn('text-body3s', 'text-white')}>총 포인트</p>
        <div className={cn('flex', 'items-center', 'gap-[0.5rem]')}>
          <PointCircleIcon color="#FFFFFF" />
          <p className={cn('text-body2s', 'text-white')}>
            {ateam.bettingPoint + bteam.bettingPoint}
          </p>
        </div>
      </div>

      <TeamMatchPoint
        team={bteam}
        isPredicted={betting.predictedWinTeamId === bteam.teamId}
      />
    </div>
  );
};

export default MatchPointContainer;
