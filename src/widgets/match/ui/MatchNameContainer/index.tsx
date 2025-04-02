'use client';

import { useSelectedGameIdStore } from '@/shared/stores';
import { ResponseStageGame } from '@/shared/types/community';
import { cn } from '@/shared/utils/cn';

interface MatchNameContainerProps {
  gameData: ResponseStageGame | undefined;
}

const MatchNameContainer = ({ gameData }: MatchNameContainerProps) => {
  const { selectedGameId, setSelectedGameId } = useSelectedGameIdStore();
  const matchNames =
    gameData?.games.map((game) => ({
      name: game.gameName,
      id: game.gameId,
    })) ?? [];

  return (
    <div className={cn('flex', 'gap-[2.25rem]')}>
      {matchNames.map(({ name, id }) => (
        <div
          key={id}
          className={cn(
            'flex',
            'pb-[1.25rem]',
            'flex-col',
            'justify-center',
            'items-center',
            Number(selectedGameId) === id &&
              'border-b-2 border-solid border-main-600',
          )}
        >
          <button
            className={cn(
              'text-body1e',
              'text-center',
              Number(selectedGameId) === id ? 'text-white' : 'text-gray-500',
            )}
            onClick={() => setSelectedGameId(id)}
          >
            {name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default MatchNameContainer;
