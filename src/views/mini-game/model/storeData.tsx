import { TicketIcon } from '@/shared/assets/icons';

type TicketType = 'YAVARWEE' | 'COINTOSS' | 'PLINKO';

export const createStoreItems = (
  buyTicket: (ticketType: TicketType) => void,
) => [
  {
    icon: (isActive: boolean) => (
      <TicketIcon color={isActive ? '#fff' : '#898989'} />
    ),
    name: '야바위',
    type: 'store',
    action: () => buyTicket('YAVARWEE'),
  },
  {
    icon: (isActive: boolean) => (
      <TicketIcon color={isActive ? '#fff' : '#898989'} />
    ),
    name: '코인토스',
    type: 'store',
    action: () => buyTicket('COINTOSS'),
  },
  {
    icon: (isActive: boolean) => (
      <TicketIcon color={isActive ? '#fff' : '#898989'} />
    ),
    name: '플린코',
    type: 'store',
    action: () => buyTicket('PLINKO'),
  },
];
