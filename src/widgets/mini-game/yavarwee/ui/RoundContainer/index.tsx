import { Round } from '@/entities/mini-game/yavarwee';
import { cn } from '@/shared/utils/cn';

const RoundContainer = ({ currentRound }: { currentRound: number }) => {
  return (
    <div className={cn('flex', 'items-center')}>
      {[1, 2, 3, 4, 5].map((roundNumber) => (
        <Round key={roundNumber} isCurrent={roundNumber === currentRound}>
          {roundNumber}라운드
        </Round>
      ))}
    </div>
  );
};

export default RoundContainer;
