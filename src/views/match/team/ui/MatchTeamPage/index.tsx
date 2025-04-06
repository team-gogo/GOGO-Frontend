'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useGetStageGameQuery } from '@/entities/community/model/useGetStageGameQuery';
import ShowBracketButton from '@/entities/match/team/ui/ShowBracketButton';
import BracketModal from '@/entities/stage/ui/BracketModal';
import {
  useSelectedGameIdStore,
  useTeamDetailInfoStore,
  useTeamDetailModalStore,
} from '@/shared/stores';
import useBracketModalStore from '@/shared/stores/useBracketModalStore';
import BackPageButton from '@/shared/ui/backPageButton';
import TeamDetailModal from '@/shared/ui/teamDetailModal';
import { cn } from '@/shared/utils/cn';
import { useGetTeamInfo } from '@/views/match/model/useGetTeamInfo';
import { MatchNameContainer, TeamListContainer } from '@/widgets/match';

const MatchTeamPage = () => {
  const params = useParams<{ stageId: string }>();
  const { stageId } = params;

  const { data: gameData } = useGetStageGameQuery(stageId);
  const { isBracketModalOpen, setIsBracketModalOpen } = useBracketModalStore();
  const { selectedGameId, setSelectedGameId } = useSelectedGameIdStore();
  const { isTeamDetailModalOpen, setIsTeamDetailModalOpen } =
    useTeamDetailModalStore();
  const { setCategory } = useTeamDetailInfoStore();

  useEffect(() => {
    if (gameData) {
      setSelectedGameId(gameData.games[0].gameId);
    }
  }, [gameData]);

  useEffect(() => {
    if (!gameData?.games || !selectedGameId) return;

    const selectedGame = gameData.games.find(
      (game) => game.gameId === Number(selectedGameId),
    );
    if (selectedGame) {
      setCategory(selectedGame.category);
    }
  }, [gameData, selectedGameId, setCategory]);

  const { data: teamInfoData } = useGetTeamInfo(Number(selectedGameId));

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
          <div className={cn('flex', 'w-full', 'justify-between')}>
            <MatchNameContainer gameData={gameData} />
            <ShowBracketButton onClick={() => setIsBracketModalOpen(true)} />
          </div>
          <TeamListContainer teams={teamInfoData} />
        </div>
      </div>
      {isTeamDetailModalOpen && (
        <TeamDetailModal onClose={() => setIsTeamDetailModalOpen(false)} />
      )}
      {isBracketModalOpen && (
        <BracketModal
          onClose={() => setIsBracketModalOpen(false)}
          _gameId={gameData?.games[0].gameId || 0}
        />
      )}
    </div>
  );
};

export default MatchTeamPage;
