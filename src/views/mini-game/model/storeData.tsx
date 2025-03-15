import { TicketIcon } from '@/shared/assets/icons';

export const storeItems = [
  {
    icon: (isActive: boolean) => (
      <TicketIcon color={isActive ? '#fff' : '#898989'} />
    ),
    name: '야바위',
    action: () => console.log('야바위 구매'),
    type: 'store',
  },
  {
    icon: (isActive: boolean) => (
      <TicketIcon color={isActive ? '#fff' : '#898989'} />
    ),
    name: '코인토스',
    action: () => console.log('코인토스 구매'),
    type: 'store',
  },
  {
    icon: (isActive: boolean) => (
      <TicketIcon color={isActive ? '#fff' : '#898989'} />
    ),
    name: '플린코',
    action: () => console.log('플린코 구매'),
    type: 'store',
  },
];
