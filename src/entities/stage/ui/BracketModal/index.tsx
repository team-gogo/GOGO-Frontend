import { useMemo } from 'react';
import BracketConnectionLayer from '@/shared/ui/BracketConnectionLayer';
import BracketTeamDisplay from '@/shared/ui/BracketTeamDisplay';
import ModalLayout from '@/shared/ui/modalLayout';
import { cn } from '@/shared/utils/cn';
import getBracketMock from '@/views/stage/bracket/Mock/getBracketMock';

interface BracketModalProps {
  onClose: () => void;
  _gameId: number;
}

interface GroupDistribution {
  top: number;
  bottom: number;
}

const BracketModal = ({ onClose, _gameId }: BracketModalProps) => {
  const bracketMockData = getBracketMock(5);

  const teamCount = bracketMockData.reduce((count, match) => {
    let matchTeams = 0;
    if (match.teamAId !== null) matchTeams++;
    if (match.teamBId !== null) matchTeams++;
    return count + matchTeams;
  }, 0);

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
          <BracketTeamDisplay teamCount={teamCount} />
        </div>
      </div>
    </ModalLayout>
  );
};

export default BracketModal;
