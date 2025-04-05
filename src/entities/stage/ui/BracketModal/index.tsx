import { useQuery } from '@tanstack/react-query';
import BracketConnectionLayer from '@/shared/ui/BracketConnectionLayer';
import ModalLayout from '@/shared/ui/modalLayout';
import { cn } from '@/shared/utils/cn';
import { getTeamInfo } from '@/views/match/api/getTeamInfo';

interface BracketModalProps {
  onClose: () => void;
  gameId: number;
}

const BracketModal = ({ onClose, gameId }: BracketModalProps) => {
  const { data: gameInfo } = useQuery({
    queryKey: ['gameInfo', gameId],
    queryFn: () => getTeamInfo(gameId),
  });

  const teamCount = gameInfo?.count || 7;

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
        <div className={cn('relative flex h-[400px] flex-col')}>
          <BracketConnectionLayer
            finalStage={1}
            teamCount={teamCount}
            firstRoundDistribution={[
              { top: 1, bottom: 1 },
              { top: 1, bottom: 1 },
            ]}
          />
        </div>
      </div>
    </ModalLayout>
  );
};

export default BracketModal;
