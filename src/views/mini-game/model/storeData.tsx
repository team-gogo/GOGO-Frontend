import { TicketIcon } from '@/shared/assets/icons';

export const createStoreItems = (
  buyTicket: (ticketType: 'COINTOSS' | 'YAVARWEE' | 'PLINKO') => void,
  isPending: (ticketType: 'COINTOSS' | 'YAVARWEE' | 'PLINKO') => boolean,
) => [
  {
    icon: (isActive: boolean) => (
      <TicketIcon
        color={isActive ? '#fff' : '#898989'}
        className="mobile:h-[2.25rem] mobile:w-[2.25rem]"
      />
    ),
    name: '야바위',
    type: 'store',
    action: () => buyTicket('YAVARWEE'),
    isPending: isPending('YAVARWEE'),
  },
  {
    icon: (isActive: boolean) => (
      <TicketIcon
        color={isActive ? '#fff' : '#898989'}
        className="mobile:h-[2.25rem] mobile:w-[2.25rem]"
      />
    ),
    name: '코인 토스',
    type: 'store',
    action: () => buyTicket('COINTOSS'),
    isPending: isPending('COINTOSS'),
  },
  {
    icon: (isActive: boolean) => (
      <TicketIcon
        color={isActive ? '#fff' : '#898989'}
        className="mobile:h-[2.25rem] mobile:w-[2.25rem]"
      />
    ),
    name: '플린코',
    type: 'store',
    action: () => buyTicket('PLINKO'),
    isPending: isPending('PLINKO'),
  },
];
