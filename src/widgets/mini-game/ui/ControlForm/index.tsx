import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { BettingActionBox, PlayerResources } from '@/entities/mini-game';
import { CoinTossForm } from '@/shared/types/mini-game/coin-toss';
import { YavarweeForm } from '@/shared/types/mini-game/yavarwee';
import { cn } from '@/shared/utils/cn';

interface ControlFormProps<T extends CoinTossForm | YavarweeForm> {
  register: UseFormRegister<T>;
  watch: UseFormWatch<T>;
  point: number;
  ticket: number;
  isPending?: boolean;
  isPlaying?: boolean;
}

const ControlForm = <T extends CoinTossForm | YavarweeForm>({
  register,
  watch,
  point,
  ticket,
  isPending,
  isPlaying,
}: ControlFormProps<T>) => {
  return (
    <div className={cn('space-y-24')}>
      <PlayerResources point={point} ticket={ticket} />
      <BettingActionBox
        register={register}
        watch={watch}
        point={point}
        ticket={ticket}
        isPending={isPending}
        isPlaying={isPlaying}
      />
    </div>
  );
};

export default ControlForm;
