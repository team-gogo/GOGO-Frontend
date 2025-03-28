import React from 'react';
import { GameSelectionCard } from '@/entities/mini-game';
import {
  ActiveGameList,
  MyTicketType,
  ShopTicketStatusDto,
} from '@/shared/types/mini-game';
import { cn } from '@/shared/utils/cn';

interface GameItem {
  icon: (isActive: boolean) => React.ReactNode;
  name: string;
  type: string;
  action?: () => void;
  isPending?: boolean;
}

interface GameCardContainerProps {
  items: GameItem[];
  activeGameList: ActiveGameList;
  getTicketCount?: MyTicketType;
  getShopTicket?: ShopTicketStatusDto;
  myPoint?: number;
}

const GameCardContainer = ({
  items,
  activeGameList,
  getTicketCount,
  getShopTicket,
  myPoint,
}: GameCardContainerProps) => {
  const activeList = [
    activeGameList.isYavarweeActive,
    activeGameList.isCoinTossActive,
    activeGameList.isPlinkoActive,
  ];

  const ticketCounts = [
    getTicketCount?.yavarwee,
    getTicketCount?.coinToss,
    getTicketCount?.plinko,
  ];

  const shopTickets = [
    getShopTicket?.yavarwee,
    getShopTicket?.coinToss,
    getShopTicket?.plinko,
  ];

  return (
    <div className={cn('flex', 'items-center', 'gap-24', 'w-full', 'mt-24')}>
      {items.map((item, index) => {
        return (
          <GameSelectionCard
            key={index}
            icon={item.icon}
            name={item.name}
            type={item.type}
            isActive={activeList[index]}
            ticketCount={ticketCounts[index]}
            shopTicket={shopTickets[index]}
            myPoint={myPoint}
            action={item.action}
            isPending={item.isPending}
          />
        );
      })}
    </div>
  );
};

export default GameCardContainer;
