import { useRouter } from 'next/navigation';
import { CoinIcon, PlinkoIcon, ShellGameIcon } from '@/shared/assets/icons';

export const createMiniGameItems = (
  router: ReturnType<typeof useRouter>,
  stageId: string,
) => [
  {
    icon: (isActive: boolean) => (
      <ShellGameIcon
        size={60}
        color={isActive ? '#fff' : '#898989'}
        className="h-[2.25rem] w-[2.25rem] pad:h-[3.75rem] pad:w-[3.75rem]"
      />
    ),
    name: '야바위',
    type: 'game',
    action: () => router.push(`/mini-game/${stageId}/yavarwee`),
  },
  {
    icon: (isActive: boolean) => (
      <CoinIcon
        size={60}
        color={isActive ? '#fff' : '#898989'}
        className="h-[2.25rem] w-[2.25rem] pad:h-[3.75rem] pad:w-[3.75rem]"
      />
    ),
    name: '코인 토스',
    type: 'game',
    action: () => router.push(`/mini-game/${stageId}/coin-toss`),
  },
  {
    icon: (isActive: boolean) => (
      <PlinkoIcon
        size={60}
        color={isActive ? '#fff' : '#898989'}
        className="h-[2.25rem] w-[2.25rem] pad:h-[3.75rem] pad:w-[3.75rem]"
      />
    ),
    name: '플린코',
    type: 'game',
    action: () => router.push(`/mini-game/${stageId}/plinko`),
  },
];
