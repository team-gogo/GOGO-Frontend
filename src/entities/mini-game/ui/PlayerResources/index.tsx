import { CoinIcon, TicketIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

const PlayerResources = () => {
  return (
    <div className={cn('flex', 'items-center', 'gap-[40px]')}>
      <div className={cn('flex', 'items-center', 'gap-24')}>
        <p className={cn('text-gray-300', 'text-body1e')}>보유 코인</p>
        <div className={cn('flex', 'items-center', 'gap-12')}>
          <CoinIcon />
          <p className={cn('text-body2s', 'text-white')}>2000</p>
        </div>
      </div>
      <div className={cn('flex', 'items-center', 'gap-24')}>
        <p className={cn('text-gray-300', 'text-body1e')}>티켓</p>
        <div className={cn('flex', 'items-center', 'gap-12')}>
          <TicketIcon size={40} color="#fff" />
          <p className={cn('text-body2s', 'text-white')}>2</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerResources;
