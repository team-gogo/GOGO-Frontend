import { CoinIcon, TicketIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

interface ResourcesProps {
  point: number;
  coinTossTicket: number;
}

const PlayerResources = ({ point, coinTossTicket }: ResourcesProps) => {
  return (
    <div
      className={cn(
        'flex',
        'items-center',
        'gap-[40px]',
        'mobile:flex-col',
        'mobile:items-start',
        'mobile:gap-20',
      )}
    >
      <div className={cn('flex', 'items-center', 'gap-24')}>
        <p className={cn('text-gray-300', 'text-body1s', 'mobile:text-body3s')}>
          보유 코인
        </p>
        <div className={cn('flex', 'items-center', 'gap-12')}>
          <CoinIcon />
          <p className={cn('text-body2s', 'text-white', 'mobile:text-body3s')}>
            {point}
          </p>
        </div>
      </div>
      <div className={cn('flex', 'items-center', 'gap-24')}>
        <p className={cn('text-gray-300', 'text-body1s', 'mobile:text-body3s')}>
          티켓
        </p>
        <div className={cn('flex', 'items-center', 'gap-12')}>
          <TicketIcon size={24} color="#fff" />
          <p className={cn('text-body2s', 'text-white', 'mobile:text-body3s')}>
            {coinTossTicket}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerResources;
