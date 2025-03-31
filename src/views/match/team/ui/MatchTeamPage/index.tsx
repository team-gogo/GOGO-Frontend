'use client';

import { useParams } from 'next/navigation';
import { useGetStageGameQuery } from '@/entities/community/model/useGetStageGameQuery';
import { useSelectedGameIdStore } from '@/shared/stores';
import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import { useGetTeamInfo } from '@/views/match/model/useGetTeamInfo';
import { MatchNameContainer, TeamListContainer } from '@/widgets/match';

const MatchTeamPage = () => {
  const params = useParams<{ stageId: string }>();
  const { stageId } = params;

  const { data: gameData } = useGetStageGameQuery(stageId);

  const { selectedGameId } = useSelectedGameIdStore();

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
          <MatchNameContainer gameData={gameData} />

          <TeamListContainer teams={teamInfoData} />
        </div>
      </div>
    </div>
  );
};

export default MatchTeamPage;
