import { UseFormRegister } from 'react-hook-form';
import { PointIcon } from '@/shared/assets/svg';
import { CoinTossForm } from '@/shared/types/mini-game/conin-toss';
import Button from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';

const BettingActionBox = ({
  register,
}: {
  register: UseFormRegister<CoinTossForm>;
}) => {
  return (
    <div className={cn('flex', 'items-center', 'gap-24')}>
      <Input
        type="number"
        placeholder="포인트 입력해주세요"
        icon={<PointIcon />}
        {...register('amount', { required: '베팅 포인트를 입력해주세요' })}
      />
      <Button type="submit">뒤집기</Button>
    </div>
  );
};

export default BettingActionBox;
