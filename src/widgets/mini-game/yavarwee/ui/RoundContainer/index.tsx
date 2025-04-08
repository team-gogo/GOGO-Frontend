import { Round } from '@/entities/mini-game/yavarwee';
import { cn } from '@/shared/utils/cn';

const RoundContainer = () => {
  return (
    <div className={cn('flex', 'items-center')}>
      <Round>1라운드</Round>
      <Round>2라운드</Round>
      <Round>3라운드</Round>
      <Round>4라운드</Round>
      <Round>5라운드</Round>
    </div>
  );
};

export default RoundContainer;
