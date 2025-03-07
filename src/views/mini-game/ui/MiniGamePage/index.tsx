'use client';

import React from 'react';
import { GameInfo, StoreInfo } from '@/entities/mini-game';
import { StoreIcon } from '@/shared/assets/icons';
import { MiniGameIcon } from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';
import { GameCardContainer, InfoContainer } from '@/widgets/mini-game';
import { getPointMock } from '../../mock/getPointMock';
import { getTicketMock } from '../../mock/getTicketMock';
import { miniGames } from '../../model/gameData';
import { storeItems } from '../../model/storeData';

const MiniGamePage = () => {
  const tickets = getTicketMock();
  const point = getPointMock();
  return (
    <div
      className={cn('w-full', 'flex', 'justify-center', 'py-[60px]', 'px-16')}
    >
      <div
        className={cn(
          'w-full',
          'max-w-[1320px]',
          'pt-[60px]',
          'pb-[60px]',
          'space-y-[120px]',
        )}
      >
        <div>
          <InfoContainer
            icon={<MiniGameIcon color="#fff" />}
            title="미니게임"
            rightContent={<GameInfo tickets={tickets} />}
          />
          <GameCardContainer items={miniGames} />
        </div>
        <div>
          <InfoContainer
            icon={<StoreIcon />}
            title="상점"
            rightContent={<StoreInfo point={point} />}
          />
          <GameCardContainer items={storeItems} />
        </div>
      </div>
    </div>
  );
};

export default MiniGamePage;
