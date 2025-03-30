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
      path: 'coin',
      isActive: activeGameList?.isCoinTossActive,
    },
    {
      Icon: PlinkoIcon,
      label: '플린코',
      path: 'plinko',
      isActive: activeGameList?.isPlinkoActive,
    },
  ];

  const handleGameClick = (path: string) => {
    router.push(`/mini-game/${stageId}/${path}`);
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
            isActive ? 'bg-main-600' : 'bg-gray-700',
          )}
          onClick={() => handleGameClick(path)}
        >
          <Icon size={60} color={isActive ? '#FFFFFF' : '#898989'} />
          <h2
            className={cn(
              'text-body1s',
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
