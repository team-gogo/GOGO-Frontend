import React from 'react';
import { CoinIcon, PlinkoIcon, ShellGameIcon } from '@/shared/assets/icons';
import { Tickets } from '@/shared/types/mini-game';
import { cn } from '@/shared/utils/cn';

const GameInfo = ({ tickets }: { tickets: Tickets }) => {
  return (
    <div className={cn('flex', 'items-center', 'gap-16')}>
      <div
        className={cn('pr-24', 'border-r-1', 'border-solid', 'border-gray-700')}
      >
        <p className={cn('text-white', 'text-body3s')}>티켓</p>
      </div>

      <div className={cn('flex', 'items-center', 'gap-16')}>
        <div className={cn('flex', 'items-center', 'gap-4')}>
          <ShellGameIcon />
          <p className={cn('text-body2s', 'text-white')}>{tickets.plinko}</p>
        </div>
        <div className={cn('flex', 'items-center', 'gap-4')}>
          <CoinIcon />
          <p className={cn('text-body2s', 'text-white')}>{tickets.yavarwee}</p>
        </div>
        <div className={cn('flex', 'items-center', 'gap-4')}>
          <PlinkoIcon />
          <p className={cn('text-body2s', 'text-white')}>{tickets.coinToss}</p>
        </div>
      </div>
    </div>
  );
};

export default GameInfo;
