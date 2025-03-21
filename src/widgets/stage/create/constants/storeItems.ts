import { TicketIcon } from '@/shared/assets/icons';

export const STORE_ITEMS = [
  {
    icon: TicketIcon,
    name: '야바위',
    type: 'yavarwee' as const,
  },
  {
    icon: TicketIcon,
    name: '코인토스',
    type: 'coinToss' as const,
  },
  {
    icon: TicketIcon,
    name: '플린코',
    type: 'plinko' as const,
  },
] as const;

export type StoreItemType = (typeof STORE_ITEMS)[number]['type'];
