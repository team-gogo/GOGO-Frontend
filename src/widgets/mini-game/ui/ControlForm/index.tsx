import { UseFormRegister, SubmitHandler } from 'react-hook-form';
import { BettingActionBox, PlayerResources } from '@/entities/mini-game';
import { CoinTossForm } from '@/shared/types/mini-game/conin-toss';
import { cn } from '@/shared/utils/cn';

interface ControlFormProps {
  register: UseFormRegister<CoinTossForm>;
  onSubmit: SubmitHandler<CoinTossForm>;
}

const ControlForm = ({ register }: ControlFormProps) => {
  return (
    <div className={cn('space-y-24')}>
      <PlayerResources />
      <BettingActionBox register={register} />
    </div>
  );
};

export default ControlForm;
