'use client';

import { usePathname } from 'next/navigation';
import useSelectSport from '@/shared/model/useSelectSport';
import useStageNameStore from '@/shared/stores/useStageNameStore';
import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import { MatchFilterHeader, StageApply } from '@/widgets/stage/apply';
import { useGetMatchApplyList } from '../../model/useGetMatchApplyList';

const MatchApplyPage = () => {
  const pathname = usePathname();
  const stageId = pathname.match(/stageId=(\d+)/)?.[1];
  const { data: matchApplyList, isPending } = useGetMatchApplyList(
    Number(stageId),
  );
  const { selectedSport, toggleSportSelection } = useSelectSport();
  const { stageName } = useStageNameStore();

  const filteredGames = selectedSport
    ? matchApplyList?.games.filter((game) => game.category === selectedSport)
    : matchApplyList?.games;

  return (
    <div
      className={cn(
        'flex',
        'w-full',
        'flex-col',
        'items-center',
        'py-[2em]',
        'px-[1rem]',
        'min-h-[calc(100vh-7.25rem)]',
        'h-full',
      )}
    >
      <div
        className={cn(
          'flex',
          'flex-col',
          'w-full',
          'max-w-[82.5rem]',
          'gap-[3.75rem]',
          'h-full',
          'flex-grow',
        )}
      >
        <BackPageButton />
        <div
          className={cn(
            'flex',
            'w-full',
            'flex-col',
            'gap-[1.5rem]',
            'h-full',
            'flex-grow',
          )}
        >
          <MatchFilterHeader
            stageName={stageName}
            selectedSport={selectedSport}
            toggleSportSelection={toggleSportSelection}
          />
          {isPending ? (
            <div
              className={cn(
                'flex',
                'items-center',
                'justify-center',
                'flex-grow',
                'text-body1e',
                'text-white',
              )}
            >
              정보를 불러오는중...
            </div>
          ) : (
            <div
              className={cn(
                'grid',
                'grid-cols-3',
                'gap-x-[1.125rem]',
                'gap-y-[1.5rem]',
                'tablet:grid-cols-1',
                'w-full',
              )}
            >
              {filteredGames?.map((game) => (
                <StageApply
                  key={game.gameId}
                  game={game}
                  stageId={Number(stageId)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchApplyPage;
