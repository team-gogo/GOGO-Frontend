'use client';

import React from 'react';
import { GameInfo, StoreInfo } from '@/entities/mini-game';
import { StoreIcon } from '@/shared/assets/icons';
import { MiniGameIcon } from '@/shared/assets/svg';
import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import { GameCardContainer, InfoContainer } from '@/widgets/mini-game';
import { getShopTicketStatus } from '../..';
import { miniGames } from '../../model/gameData';
import { storeItems } from '../../model/storeData';
import getActiveGameList from '../Mock/getActiveGameList';
import getMyTicket from '../Mock/getMyTicket';

const MiniGamePage = () => {
  const activeGameList = getActiveGameList();
  const getTicketCount = getMyTicket();
  const getShopTicket = getShopTicketStatus();

  return (
    <div
      className={cn(
        'flex',
        'w-full',
        'flex-col',
        'items-center',
        'justify-center',
        'py-[2rem]',
        'px-[1rem]',
      )}
    >
      <div
        className={cn(
          'flex',
          'flex-col',
          'w-full',
          'max-w-[82.5rem]',
          'gap-[2.25rem]',
        )}
      >
        <BackPageButton />
        <div className={cn('flex', 'gap-[5rem]', 'flex-col')}>
          <div>
            <InfoContainer
              icon={<MiniGameIcon color="#fff" />}
              title="미니게임"
              rightContent={<GameInfo getTicketCount={getTicketCount} />}
            />
            <GameCardContainer
              items={miniGames}
              activeGameList={activeGameList}
              getTicketCount={getTicketCount}
            />
          </div>
          <div>
            <InfoContainer
              icon={<StoreIcon />}
              title="상점"
              rightContent={<StoreInfo />}
            />
            <GameCardContainer
              items={storeItems}
              activeGameList={activeGameList}
              getShopTicket={getShopTicket}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniGamePage;
