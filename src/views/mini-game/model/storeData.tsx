import { TicketIcon } from '@/shared/assets/icons';

type TicketType = 'YAVARWEE' | 'COINTOSS' | 'PLINKO';

export const createStoreItems = (
  buyTicket: (ticketType: TicketType) => void,
  isPending: boolean,
) => [
  {
    icon: (isActive: boolean) => (
      <TicketIcon color={isActive ? '#fff' : '#898989'} />
    ),
    name: '야바위',
    type: 'store',
    action: () => buyTicket('YAVARWEE'),
    isPending,
  },
  {
    icon: (isActive: boolean) => (
      <TicketIcon color={isActive ? '#fff' : '#898989'} />
    ),
    name: '코인토스',
    type: 'store',
    action: () => buyTicket('COINTOSS'),
    isPending,
  },
  {
    icon: (isActive: boolean) => (
      <TicketIcon color={isActive ? '#fff' : '#898989'} />
    ),
    name: '플린코',
    type: 'store',
    action: () => buyTicket('PLINKO'),
    isPending,
  },
];
