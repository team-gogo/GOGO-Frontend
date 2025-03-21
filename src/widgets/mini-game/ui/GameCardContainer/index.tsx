import { ReactNode } from 'react';
import { GameSelectionCard } from '@/entities/mini-game';
import {
  ActiveGameList,
  MyTicketType,
  ShopTicketStatusDto,
} from '@/shared/types/mini-game';
import { cn } from '@/shared/utils/cn';

interface GameItem {
  icon: (isActive: boolean) => ReactNode;
  name: string;
  type: string;
}

interface GameCardContainerProps {
  items: GameItem[];
  activeGameList: ActiveGameList;
  getTicketCount?: MyTicketType;
  getShopTicket?: ShopTicketStatusDto;
}

const GameCardContainer = ({
  items,
  activeGameList,
  getTicketCount,
  getShopTicket,
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
          />
        );
      })}
    </div>
  );
};

export default GameCardContainer;
