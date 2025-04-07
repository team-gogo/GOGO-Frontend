'use client';

import { useRouter } from 'next/navigation';
import { CoinIcon, PlinkoIcon, ShellGameIcon } from '@/shared/assets/icons';
import { ActiveGameList } from '@/shared/types/mini-game';
import { cn } from '@/shared/utils/cn';

interface MiniGameSectionProps {
  stageId: string;
  activeGameList: ActiveGameList | undefined;
}

const MiniGameSection = ({ stageId, activeGameList }: MiniGameSectionProps) => {
  const router = useRouter();

  const gameData = [
    {
      Icon: ShellGameIcon,
      label: '야바위',
      path: 'shell-game',
      isActive: activeGameList?.isYavarweeActive,
    },
    {
      Icon: CoinIcon,
      label: '코인',
      path: 'coin-toss',
      isActive: activeGameList?.isCoinTossActive,
    },
    {
      Icon: PlinkoIcon,
      label: '플린코',
      path: 'plinko',
      isActive: activeGameList?.isPlinkoActive,
    },
  ];

  const handleGameClick = (path: string, isActive?: boolean) => {
    if (isActive) {
      router.push(`/mini-game/${stageId}/${path}`);
    }
  };

  return (
    <div
      className={cn('w-full', 'h-full', 'gap-[1.5rem]', 'flex', 'items-center')}
    >
      {gameData.map(({ Icon, label, path, isActive }, index) => (
        <button
          key={index}
          className={cn(
            'w-full',
            'rounded-xl',
            'justify-center',
            'flex',
            'items-center',
            'p-[1.25rem]',
            'flex-col',
            'h-full',
            'gap-[1rem]',
            isActive
              ? 'cursor-pointer bg-main-600'
              : 'cursor-default bg-gray-700 opacity-50 blur-[2px]',
          )}
          onClick={() => handleGameClick(path, isActive)}
        >
          <Icon
            color={isActive ? '#FFFFFF' : '#898989'}
            className={cn(
              'pad:w-[3.75rem]',
              'pad:h-[3.75rem]',
              'w-[2rem]',
              'h-[2rem]',
            )}
          />
          <h2
            className={cn(
              'pad:text-body1s',
              'text-body3s',
              isActive ? 'text-white' : 'text-gray-400',
            )}
          >
            {label}
          </h2>
        </button>
      ))}
    </div>
  );
};

export default MiniGameSection;
