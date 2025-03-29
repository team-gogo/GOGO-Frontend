import { TeamType } from '@/shared/types/my/bet';
import { cn } from '@/shared/utils/cn';

interface TeamFormationProps {
  ateam: TeamType;
  bteam: TeamType;
}

const MatchTeamFormation = ({ ateam, bteam }: TeamFormationProps) => {
  return (
    <div className={cn('flex', 'w-full', 'flex-col', 'gap-[1.5rem]')}>
      <div className={cn('flex', 'w-full', 'justify-between', 'items-center')}>
        <p className={cn('text-h4e', 'text-white')}>팀 정보</p>
        <div className={cn('flex', 'items-center', 'gap-[1.5rem]')}>
          <div className={cn('flex', 'items-center', 'gap-[0.75rem]')}>
            <div
              className={cn(
                'w-[2.25rem]',
                'h-[2.25rem]',
                'rounded-md',
                'bg-[#73B2FF]',
              )}
            />
            <p className={cn('text-body1e', 'text-white')}>{ateam.teamName}</p>
          </div>

          <div className={cn('flex', 'items-center', 'gap-[0.75rem]')}>
            <div
              className={cn(
                'w-[2.25rem]',
                'h-[2.25rem]',
                'rounded-md',
                'bg-[#FF8282]',
              )}
            />
            <p className={cn('text-body1e', 'text-white')}>{bteam.teamName}</p>
          </div>
        </div>
      </div>

      {/* <>
        asset
      </> */}
    </div>
  );
};

export default MatchTeamFormation;
