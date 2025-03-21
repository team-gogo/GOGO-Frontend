import { TicketIcon } from '@/shared/assets/icons';
import { MoneyIcon } from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';

interface PlinkoInputHeader {
  money: number;
  ticket: number;
}

const PlinkoInputHeader = ({ money, ticket }: PlinkoInputHeader) => {
  return (
    <div className={cn('flex', 'justify-between', 'items-center')}>
      <h2 className={cn('text-body2e', 'text-white')}>보유 코인</h2>
      <div className={cn('flex', 'items-center', 'gap-[0.75rem]')}>
        <div className={cn('flex', 'items-center', 'gap-[0.75rem]')}>
          <MoneyIcon />
          <p className={cn('text-body3s', 'text-white')}>{money}</p>
        </div>

        <div className={cn('flex', 'items-center', 'gap-[0.75rem]')}>
          <TicketIcon color="#fff" size={24} />
          <p className={cn('text-body3s', 'text-white')}>{ticket}</p>
        </div>
      </div>
    </div>
  );
};

export default PlinkoInputHeader;
