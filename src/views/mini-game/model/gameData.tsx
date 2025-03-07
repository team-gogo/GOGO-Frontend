import { CoinIcon, PlinkoIcon, ShellGameIcon } from '@/shared/assets/icons';

export const miniGames = [
  {
    icon: <ShellGameIcon size={60} color="#898989" />,
    name: '야바위',
    action: () => console.log('야바위 게임 시작'),
    type: 'game',
  },
  {
    icon: <CoinIcon size={60} color="#898989" />,
    name: '코인 플립',
    action: () => console.log('코인 플립 게임 시작'),
    type: 'game',
  },
  {
    icon: <PlinkoIcon size={60} color="#898989" />,
    name: '플링코',
    action: () => console.log('플링코 게임 시작'),
    type: 'game',
  },
];
