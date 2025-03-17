import { ShellGameIcon, CoinIcon, PlinkoIcon } from '@/shared/assets/icons';

export const MINI_GAMES = [
  {
    type: 'yavarwee' as const,
    name: '야바위',
    icon: ShellGameIcon,
  },
  {
    type: 'coinToss' as const,
    name: '코인토스',
    icon: CoinIcon,
  },
  {
    type: 'plinko' as const,
    name: '플링코',
    icon: PlinkoIcon,
  },
] as const;

export type MiniGameType = (typeof MINI_GAMES)[number]['type'];
