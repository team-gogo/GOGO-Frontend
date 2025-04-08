import { CoinIcon, TicketIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

interface ResourcesProps {
  point: number;
  ticket: number;
}

const PlayerResources = ({ point, ticket }: ResourcesProps) => {
  return (
    <div
      className={cn(
        'flex',
        'items-center',
        'gap-[40px]',
        'items-start',
        'gap-20',
      )}
    >
      <div className={cn('flex', 'items-center', 'gap-24')}>
        <p className={cn('text-gray-300', 'tablet:text-body1s', 'text-body3s')}>
          보유 코인
        </p>
        <div className={cn('flex', 'items-center', 'gap-12')}>
          <CoinIcon />
          <p className={cn('tablet:text-body2s', 'text-white', 'text-body3s')}>
            {point}
          </p>
        </div>
      </div>
      <div className={cn('flex', 'items-center', 'gap-24')}>
        <p className={cn('text-gray-300', 'tablet:text-body1s', 'text-body3s')}>
          티켓
        </p>
        <div className={cn('flex', 'items-center', 'gap-12')}>
          <TicketIcon size={24} color="#fff" />
          <p className={cn('tablet:text-body2s', 'text-white', 'text-body3s')}>
            {ticket}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerResources;
