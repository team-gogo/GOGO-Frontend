import { Path, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { PointIcon } from '@/shared/assets/svg';
import { CoinTossForm } from '@/shared/types/mini-game/coin-toss';
import { YavarweeForm } from '@/shared/types/mini-game/yavarwee';
import Button from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';

type MiniGameForm = CoinTossForm | YavarweeForm;

interface BettingActionBoxProps<T extends MiniGameForm> {
  register: UseFormRegister<T>;
  watch: UseFormWatch<T>;
  point: number;
  ticket: number;
  isPending?: boolean;
  isPlaying?: boolean;
  type: 'coinToss' | 'yavarwee';
}

const BettingActionBox = <T extends MiniGameForm>({
  register,
  watch,
  point,
  ticket,
  isPending,
  isPlaying,
  type,
}: BettingActionBoxProps<T>) => {
  const amount = watch('amount' as Path<T>);

  const isDisabled =
    !ticket || (amount && Number(amount) > point) || isPending || isPlaying;

  return (
    <div
      className={cn(
        'flex',
        'flex-col',
        'pad:flex-row',
        'items-start',
        'pad:items-center',
        'gap-20',
        'pad:gap-[40px]',
      )}
    >
      <Input
        type="number"
        placeholder="포인트 입력해주세요"
        icon={<PointIcon />}
        min={1}
        step={1}
        {...register('amount' as Path<T>, {
          required: '베팅 포인트를 입력해주세요',
          min: {
            value: 1,
            message: '1 이상의 값을 입력해주세요',
          },
          validate: {
            isInteger: (v) =>
              Number.isInteger(Number(v)) || '정수만 입력 가능합니다',
          },
        })}
      />
      <Button type="submit" disabled={isDisabled}>
        {type === 'coinToss' ? '섞기' : '뒤집기'}
      </Button>
    </div>
  );
};

export default BettingActionBox;
