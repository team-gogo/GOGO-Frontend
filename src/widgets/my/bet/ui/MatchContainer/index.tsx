import { MyBetResponse } from '@/shared/types/my/bet';
import Match from '@/shared/ui/match';
import { cn } from '@/shared/utils/cn';

interface MatchContainerProps {
  userBetInfo: MyBetResponse;
}

const MatchContainer = ({ userBetInfo }: MatchContainerProps) => {
  return (
    <div className={cn('w-full', 'flex', 'flex-col', 'gap-[1.5rem]')}>
      <h2 className={cn('text-body1e', 'text-white')}>내가 참여한 스테이지</h2>
      <div
        className={cn(
          'grid',
          'grid-cols-2',
          'gap-x-[2.5rem]',
          'gap-y-[2rem]',
          'tablet:grid-cols-1',
        )}
      >
        {userBetInfo.matches.map((match) => (
          <Match key={match.matchId} match={match} />
        ))}
      </div>
    </div>
  );
};

export default MatchContainer;
