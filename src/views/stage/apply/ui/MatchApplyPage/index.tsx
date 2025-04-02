'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { postStage } from '@/entities/stage/api/postStage';
import useSelectSport from '@/shared/model/useSelectSport';
import useStageNameStore from '@/shared/stores/useStageNameStore';
import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import { useStageStore } from '@/store/stageStore';
import { MatchFilterHeader, StageApply } from '@/widgets/stage/apply';
import ConfirmStage from '@/widgets/stage/apply/ui/ConfirmStage';
import { useGetMatchApplyList } from '../../model/useGetMatchApplyList';

const MatchApplyPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const stageId = pathname.match(/stageId=(\d+)/)?.[1];
  const { data: matchApplyList, isPending } = useGetMatchApplyList(
    Number(stageId),
  );
  const { selectedSport, toggleSportSelection } = useSelectSport();
  const { stageName } = useStageNameStore();
  const { getStageGames } = useStageStore();

  const [confirmedGames, setConfirmedGames] = useState<Record<string, boolean>>(
    {},
  );

  useEffect(() => {
    if (matchApplyList?.games) {
      const confirmed: Record<string, boolean> = {};
      matchApplyList.games.forEach((game) => {
        const storedIsConfirmed = sessionStorage.getItem(
          `isConfirmed_${game.gameId}`,
        );
        confirmed[game.gameId] = storedIsConfirmed === 'true';
      });
      setConfirmedGames(confirmed);
    }
  }, [matchApplyList?.games]);

  const filteredGames = selectedSport
    ? matchApplyList?.games.filter((game) => game.category === selectedSport)
    : matchApplyList?.games;

  const handleConfirmStage = async () => {
    try {
      if (!stageId) {
        toast.error('스테이지 ID를 찾을 수 없습니다.');
        return;
      }

      const stageGames = getStageGames(Number(stageId));

      let currentStageGames = stageGames;

      if (!currentStageGames || currentStageGames.length === 0) {
        const savedStageGames = sessionStorage.getItem(`stageGames_${stageId}`);
        if (savedStageGames) {
          const parsedGames = JSON.parse(savedStageGames);
          if (parsedGames && parsedGames.length > 0) {
            console.log(parsedGames);
            currentStageGames = parsedGames;
          }
        }
      }

      if (!currentStageGames || currentStageGames.length === 0) {
        toast.error('저장된 경기 일정이 없습니다.');
        return;
      }

      await postStage(Number(stageId), { games: currentStageGames });
      toast.success('스테이지 정보가 성공적으로 저장되었습니다.');
      router.push('/stage');
    } catch (error) {
      console.error('Stage confirmation error:', error);
      toast.error('스테이지 저장 중 오류가 발생했습니다.');
    }
  };

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
        <BackPageButton onClick={() => router.push(`/stage`)} />
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
          <div className="flex flex-row items-center space-x-4">
            <h1 className={cn('text-h4e', 'text-white')}>{stageName}</h1>
            <div className="flex-grow" />
            {JSON.parse(localStorage.getItem('stageAdminArr') || '[]').includes(
              Number(stageId),
            ) && <ConfirmStage onClick={handleConfirmStage} />}
            <MatchFilterHeader
              selectedSport={selectedSport}
              toggleSportSelection={toggleSportSelection}
            />
          </div>
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
                  isConfirmed={confirmedGames[game.gameId] || false}
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
