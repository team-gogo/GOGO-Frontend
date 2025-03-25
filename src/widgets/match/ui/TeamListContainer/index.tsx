import {
  OfficialIcon,
  RightArrowIcon,
  TeamCountIcon,
} from '@/shared/assets/svg';
import { Team } from '@/shared/types/match';
import { cn } from '@/shared/utils/cn';

interface TeamListContainerProps {
  teams: Team[];
}

const TeamListContainer = ({ teams }: TeamListContainerProps) => {
  return (
    <div className={cn('flex', 'flex-col', 'w-full', 'gap-[1.25rem]')}>
      {teams.map((team) => (
        <div
          key={team.teamId}
          className={cn(
            'flex',
            'w-full',
            'px-[1.5rem]',
            'py-[1.25rem]',
            'flex-col',
            'rounded-xl',
            'bg-gray-700',
          )}
        >
          <div className={cn('flex', 'justify-between', 'items-center')}>
            <p className={cn('text-body3s', 'text-white')}>{team.teamName}</p>
            <div className={cn('flex', 'gap-[1.25rem]')}>
              <div className={cn('flex', 'gap-[0.5rem]', 'items-center')}>
                <OfficialIcon isResponsive={false} />
                <p className={cn('text-caption1s', 'text-white')}>
                  {team.winCount}승
                </p>
              </div>
              <div className={cn('flex', 'gap-[0.5rem]', 'items-center')}>
                <TeamCountIcon isResponsive={false} color="#526FFE" />
                <p className={cn('text-caption1s', 'text-main-500')}>
                  {team.participantCount}명
                </p>
              </div>
              <button className={cn('flex', 'gap-[0.5rem]', 'items-center')}>
                <p className={cn('text-caption1s', 'text-gray-300')}>
                  자세히보기
                </p>
                <RightArrowIcon size="1.25rem" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamListContainer;
