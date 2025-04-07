import React from 'react';
import { CoinIcon, PlinkoIcon, ShellGameIcon } from '@/shared/assets/icons';
import { MyTicketType } from '@/shared/types/mini-game';
import { cn } from '@/shared/utils/cn';

interface GameInfoProps {
  getTicketCount: MyTicketType | undefined;
}

const GameInfo = ({ getTicketCount }: GameInfoProps) => {
  return (
    <div className={cn('flex', 'items-center', 'mobile:gap-16', 'gap-12')}>
      <div
        className={cn(
          'mobile:pr-24',
          'border-r-1',
          'border-solid',
          'border-gray-700',
          'pr-12',
        )}
      >
        <p className={cn('text-white', 'mobile:text-body3s', 'text-caption1s')}>
          티켓
        </p>
      </div>

      <div className={cn('flex', 'items-center', 'mobile:gap-16', 'gap-12')}>
        <div className={cn('flex', 'items-center', 'gap-4')}>
          <ShellGameIcon />
          <p className={cn('mobile:text-body2s', 'text-white', 'text-body3s')}>
            {getTicketCount?.yavarwee}
          </p>
        </div>
        <div className={cn('flex', 'items-center', 'gap-4')}>
          <CoinIcon />
          <p className={cn('mobile:text-body2s', 'text-white', 'text-body3s')}>
            {getTicketCount?.coinToss}
          </p>
        </div>
        <div className={cn('flex', 'items-center', 'gap-4')}>
          <PlinkoIcon />
          <p className={cn('mobile:text-body2s', 'text-white', 'text-body3s')}>
            {getTicketCount?.plinko}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameInfo;
