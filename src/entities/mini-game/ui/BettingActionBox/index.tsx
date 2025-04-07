import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { PointIcon } from '@/shared/assets/svg';
import { CoinTossForm } from '@/shared/types/mini-game/conin-toss';
import Button from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';

const BettingActionBox = ({
  register,
  watch,
  point,
  coinTossTicket,
  isPending,
  isPlaying,
}: {
  register: UseFormRegister<CoinTossForm>;
  watch: UseFormWatch<CoinTossForm>;
  point: number;
  coinTossTicket: number;
  isPending: boolean;
  isPlaying?: boolean;
}) => {
  const amount = watch('amount');

  const isDisabled =
    !coinTossTicket ||
    (amount && Number(amount) > point) ||
    isPending ||
    isPlaying;
  return (
    <div
      className={cn(
        'flex',
        'items-center',
        'gap-24',
        'mobile:flex-col',
        'mobile:gap-20',
      )}
    >
      <Input
        type="number"
        placeholder="포인트 입력해주세요"
        icon={<PointIcon />}
        min={1}
        step={1}
        {...register('amount', {
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
        뒤집기
      </Button>
    </div>
  );
};

export default BettingActionBox;
