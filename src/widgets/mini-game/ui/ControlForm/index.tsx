import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { BettingActionBox, PlayerResources } from '@/entities/mini-game';
import { CoinTossForm } from '@/shared/types/mini-game/conin-toss';
import { cn } from '@/shared/utils/cn';

interface ControlFormProps {
  register: UseFormRegister<CoinTossForm>;
  watch: UseFormWatch<CoinTossForm>;
  point: number;
  coinTossTicket: number;
  isPending: boolean;
  isPlaying?: boolean;
}

const ControlForm = ({
  register,
  watch,
  point,
  coinTossTicket,
  isPending,
  isPlaying,
}: ControlFormProps) => {
  return (
    <div className={cn('space-y-24')}>
      <PlayerResources point={point} coinTossTicket={coinTossTicket} />
      <BettingActionBox
        register={register}
        watch={watch}
        point={point}
        coinTossTicket={coinTossTicket}
        isPending={isPending}
        isPlaying={isPlaying}
      />
    </div>
  );
};

export default ControlForm;
