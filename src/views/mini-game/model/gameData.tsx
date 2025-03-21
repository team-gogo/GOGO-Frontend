import { CoinIcon, PlinkoIcon, ShellGameIcon } from '@/shared/assets/icons';

export const miniGames = [
  {
    icon: (isActive: boolean) => (
      <ShellGameIcon size={60} color={isActive ? '#fff' : '#898989'} />
    ),
    name: '야바위',
    type: 'game',
  },
  {
    icon: (isActive: boolean) => (
      <CoinIcon size={60} color={isActive ? '#fff' : '#898989'} />
    ),
    name: '코인 플립',
    type: 'game',
  },
  {
    icon: (isActive: boolean) => (
      <PlinkoIcon size={60} color={isActive ? '#fff' : '#898989'} />
    ),
    name: '플링코',
    type: 'game',
  },
];
