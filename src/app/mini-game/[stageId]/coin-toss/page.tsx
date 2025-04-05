import { cn } from '@/shared/utils/cn';
import { CoinTossPage } from '@/views/mini-game/coin-toss';

const BettingForm = () => {
  return (
    <div
      className={cn(
        'flex',
        'min-h-screen',
        'w-full',
        'items-center',
        'justify-center',
        'px-16',
        'py-[5rem]',
        'mobile:py-[2.5rem]',
      )}
    >
      <CoinTossPage />
    </div>
  );
};

export default BettingForm;
