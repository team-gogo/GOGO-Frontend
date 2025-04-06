import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { GameFormatData } from '@/shared/types/stage/game';
import BracketConnectionLayer from '@/shared/ui/BracketConnectionLayer';
import BracketTeamDisplay from '@/shared/ui/BracketTeamDisplay';
import ModalLayout from '@/shared/ui/modalLayout';
import { cn } from '@/shared/utils/cn';
import { getGameFormat } from '../api/getGameFormat';

interface BracketModalProps {
  onClose: () => void;
  gameId: number;
}

interface GroupDistribution {
  top: number;
  bottom: number;
}

const BracketModal = ({ onClose, gameId }: BracketModalProps) => {
  const [bracketData, setBracketData] = useState<GameFormatData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGameFormat(gameId);
        setBracketData(data);
      } catch (error) {
        toast.error(String(error) || '대진표를 불러오는데 실패했습니다.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [gameId]);

  const teamCount = useMemo(() => {
    return bracketData.reduce((count: number, roundData: GameFormatData) => {
      return (
        count +
        roundData.match.reduce((matchCount: number, match) => {
          let matchTeams = 0;
          if (match.aTeamId !== null) matchTeams++;
          if (match.bTeamId !== null) matchTeams++;
          return matchCount + matchTeams;
        }, 0)
      );
    }, 0);
  }, [bracketData]);

  const finalStage = teamCount <= 4 ? 4 : 8;
  const distribution = useMemo((): [GroupDistribution, GroupDistribution] => {
    const leftTotal = Math.ceil(teamCount / 2);
    const rightTotal = Math.floor(teamCount / 2);

    return [
      {
        top: Math.ceil(leftTotal / 2),
        bottom: Math.floor(leftTotal / 2),
      },
      {
        top: Math.ceil(rightTotal / 2),
        bottom: Math.floor(rightTotal / 2),
      },
    ];
  }, [teamCount]);

  if (isLoading) {
    return (
      <ModalLayout
        title={'대진표'}
        onClose={onClose}
        containerClassName={cn(
          'rounded-lg',
          'bg-gray-700',
          'p-[40px]',
          'max-w-[70rem]',
          'w-full',
          'space-y-24',
        )}
      >
        <div
          className={cn(
            'flex h-[300px] items-center justify-center text-white',
          )}
        >
          로딩 중...
        </div>
      </ModalLayout>
    );
  }

  if (bracketData.length === 0) {
    return (
      <ModalLayout
        title={'대진표'}
        onClose={onClose}
        containerClassName={cn(
          'rounded-lg',
          'bg-gray-700',
          'p-[40px]',
          'max-w-[70rem]',
          'w-full',
          'space-y-24',
        )}
      >
        <div
          className={cn(
            'flex h-[300px] items-center justify-center text-white',
          )}
        >
          대진표를 불러오는데 실패했습니다.
        </div>
      </ModalLayout>
    );
  }

  return (
    <ModalLayout
      title={'대진표'}
      onClose={onClose}
      containerClassName={cn(
        'rounded-lg',
        'bg-gray-700',
        'p-[40px]',
        'max-w-[70rem]',
        'w-full',
        'space-y-24',
      )}
    >
      <div className={cn('flex flex-col gap-12')}>
        <hr className={cn('border-gray-600')} />
        <div className={cn('relative flex h-[380px] flex-col')}>
          <BracketConnectionLayer
            finalStage={finalStage}
            teamCount={teamCount}
            firstRoundDistribution={distribution}
          />
          <BracketTeamDisplay teamCount={teamCount} bracketData={bracketData} />
        </div>
      </div>
    </ModalLayout>
  );
};

export default BracketModal;
