'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useGetStageGameQuery } from '@/entities/community/model/useGetStageGameQuery';
import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import { useGetTeamInfo } from '@/views/match/model/useGetTeamInfo';
import { MatchNameContainer, TeamListContainer } from '@/widgets/match';

const MatchTeamPage = () => {
  const params = useParams<{ stageId: string }>();
  const { stageId } = params;

  const { data: gameData } = useGetStageGameQuery(stageId);

  const [selectedGameId, setSelectedGameId] = useState(
    String(gameData?.games[0]?.gameId ?? '1'),
  );

  const { data: teamInfoData } = useGetTeamInfo(Number(selectedGameId));

  console.log(teamInfoData);

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
          <MatchNameContainer
            gameData={gameData}
            selectedGameId={selectedGameId}
            setSelectedGameId={setSelectedGameId}
          />

          <TeamListContainer teams={teamInfoData} />
        </div>
      </div>
    </div>
  );
};

export default MatchTeamPage;
