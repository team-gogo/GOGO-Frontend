import { Path, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { LineStroke, PointIcon, WarningIcon } from '@/shared/assets/svg';
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
  minBetLimit: number;
  maxBetLimit: number;
}

const BettingActionBox = <T extends MiniGameForm>({
  register,
  watch,
  point,
  ticket,
  isPending,
  isPlaying,
  type,
  minBetLimit,
  maxBetLimit,
}: BettingActionBoxProps<T>) => {
  const amount = watch('amount' as Path<T>);

  const isInputDisabled = !ticket || isPending || isPlaying;

  const isButtonDisabled =
    !ticket ||
    isPending ||
    isPlaying ||
    !amount ||
    Number(amount) > point ||
    Number(amount) < minBetLimit ||
    Number(amount) > maxBetLimit;

  return (
    <div
      className={cn(
        'flex',
        'flex-col',
        'pad:flex-row',
        'items-start',

        'gap-20',
        'pad:gap-[40px]',
      )}
    >
      <div className="w-full pad:flex-1">
        <Input
          type="number"
          placeholder="포인트 입력해주세요"
          icon={<PointIcon />}
          min={minBetLimit}
          max={maxBetLimit}
          step={1}
          disabled={isInputDisabled}
          {...register('amount' as Path<T>, {
            required: '베팅 포인트를 입력해주세요',
            min: {
              value: minBetLimit,
              message: `${minBetLimit} 이상의 값을 입력해주세요`,
            },
            max: {
              value: maxBetLimit,
              message: `${maxBetLimit} 이하의 값을 입력해주세요`,
            },
            validate: {
              isInteger: (v) =>
                Number.isInteger(Number(v)) || '정수만 입력 가능합니다',
            },
          })}
        />
        <div className={cn('flex', 'items-center', 'gap-8', 'mt-4')}>
          <WarningIcon />
          <p className={cn('text-caption3s text-gray-400')}>
            최소 배팅 금액 : {minBetLimit}
          </p>
          <LineStroke height={16} />
          <p className={cn('text-caption3s text-gray-400')}>
            최대 배팅 금액 : {maxBetLimit}
          </p>
        </div>
      </div>
      <div className="w-full pad:flex-1">
        <Button type="submit" disabled={isButtonDisabled} className="w-full">
          {type === 'coinToss' ? '뒤집기' : '섞기'}
        </Button>
      </div>
    </div>
  );
};
export default BettingActionBox;
