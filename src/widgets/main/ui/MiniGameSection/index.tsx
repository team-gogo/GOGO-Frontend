'use client';

import { useState } from 'react';
import { MiniGameModal } from '@/entities/main';
import { CoinIcon, PlinkoIcon, ShellGameIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

const MiniGameSection = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedGame, setSelectedGame] = useState<{
    Icon: React.ComponentType<{ size: number; color: string }>;
    label: string;
  } | null>(null);

  const gameData = [
    { Icon: ShellGameIcon, label: '야바위' },
    { Icon: CoinIcon, label: '코인' },
    { Icon: PlinkoIcon, label: '플린코' },
  ];

  const handleGameClick = (
    Icon: React.ComponentType<{ size: number; color: string }>,
    label: string,
  ) => {
    setSelectedGame({ Icon, label });
    setIsModalOpen(true);
  };

  return (
    <div
      className={cn('w-full', 'h-full', 'gap-[1.5rem]', 'flex', 'items-center')}
    >
      {gameData.map(({ Icon, label }, index) => (
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
            'bg-gray-700',
            'w-full',
            'h-full',
            'gap-[1rem]',
          )}
          onClick={() => handleGameClick(Icon, label)}
        >
          <Icon size={60} color="#898989" />
          <h2 className={cn('text-body1s', 'text-gray-400')}>{label}</h2>
        </button>
      ))}
      {isModalOpen && selectedGame && (
        <MiniGameModal
          onClose={() => setIsModalOpen(false)}
          selectedGame={selectedGame}
        />
      )}
    </div>
  );
};

export default MiniGameSection;
