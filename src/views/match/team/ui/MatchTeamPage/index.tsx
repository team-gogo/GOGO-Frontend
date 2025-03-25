import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import { MatchNameContainer, TeamListContainer } from '@/widgets/match';
import getTeamList from '../Mock/getTeamList';

const MatchTeamPage = () => {
  const { team } = getTeamList();

  return (
    <div
      className={cn(
        'flex',
        'w-full',
        'flex-col',
        'items-center',
        'justify-center',
        'py-[3.75rem]',
        'px-[1rem]',
      )}
    >
      <div
        className={cn(
          'flex',
          'flex-col',
          'w-full',
          'max-w-[82.5rem]',
          'gap-[3rem]',
        )}
      >
        <BackPageButton />
        <div className={cn('flex', 'w-full', 'gap-[1.5rem]', 'flex-col')}>
          <MatchNameContainer />

          <TeamListContainer teams={team} />
        </div>
      </div>
    </div>
  );
};

export default MatchTeamPage;
