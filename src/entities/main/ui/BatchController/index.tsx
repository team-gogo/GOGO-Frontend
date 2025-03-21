import { useBatchModalStore, useMatchTeamStore } from '@/shared/stores';
import { cn } from '@/shared/utils/cn';

interface Team {
  teamId: number;
  teamName: string;
  bettingPoint: number;
  winCount: number;
}

interface BatchControllerType {
  aTeam: Team;
  bTeam: Team;
  matchId: number;
}

const BatchController = ({ aTeam, bTeam, matchId }: BatchControllerType) => {
  const { setIsBatchModalOpen } = useBatchModalStore();
  const { setATeam, setBTeam, setMatchId } = useMatchTeamStore();
  return (
    <div
      className={cn(
        'absolute',
        'inset-0',
        'backdrop-blur-sm',
        'bg-gray-900/50',
        'flex',
        'items-center',
        'justify-center',
        'rounded-xl',
      )}
    >
      <button
        onClick={() => {
          setIsBatchModalOpen(true);
          setATeam(aTeam);
          setBTeam(bTeam);
          setMatchId(matchId);
        }}
        className={cn('text-h3e', 'text-white')}
      >
        정산하기
      </button>
    </div>
  );
};

export default BatchController;
