import { TicketIcon } from '@/shared/assets/icons';

type TicketType = 'TAVARWEE' | 'COINTOSS' | 'PLINKO';

export const createStoreItems = (
  buyTicket: (ticketType: TicketType) => void,
) => [
  {
    icon: (isActive: boolean) => (
      <TicketIcon color={isActive ? '#fff' : '#898989'} />
    ),
    name: '야바위',
    type: 'store',
    action: () => buyTicket('TAVARWEE'),
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
