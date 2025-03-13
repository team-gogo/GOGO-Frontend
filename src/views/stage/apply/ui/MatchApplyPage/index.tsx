'use client';

import useSelectSport from '@/shared/model/useSelectSport';
import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import { MatchFilterHeader, StageApply } from '@/widgets/stage/apply';
import getMatchListInfo from '../Mock/getMatchListInfo';

const MatchApplyPage = () => {
  const matchListInfo = getMatchListInfo();

  const { selectedSport, toggleSportSelection } = useSelectSport();

  const filteredGames = selectedSport
    ? matchListInfo.games.filter((game) => game.category[0] === selectedSport)
    : matchListInfo.games;

  return (
    <div
      className={cn(
        'flex',
        'w-full',
        'flex-col',
        'items-center',
        'justify-center',
        'py-[2em]',
        'px-[1rem]',
      )}
    >
      <div
        className={cn(
          'flex',
          'flex-col',
          'w-full',
          'max-w-[82.5rem]',
          'gap-[3.75rem]',
        )}
      >
        <BackPageButton />
        <div className={cn('flex', 'w-full', 'flex-col', 'gap-[1.5rem]')}>
          <MatchFilterHeader
            stageName={'테스트 이름'}
            selectedSport={selectedSport}
            toggleSportSelection={toggleSportSelection}
          />
          <div
            className={cn(
              'grid',
              'grid-cols-3',
              'gap-x-[1.125rem]',
              'gap-y-[3.125rem]',
              'tablet:grid-cols-1',
              'w-full',
            )}
          >
            {filteredGames.map((game) => (
              <StageApply key={game.gameId} game={game} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchApplyPage;
