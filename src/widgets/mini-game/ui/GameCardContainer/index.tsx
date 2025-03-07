import { ReactNode } from 'react';
import { GameSelectionCard } from '@/entities/mini-game';
import { cn } from '@/shared/utils/cn';

interface GameItem {
  icon: ReactNode;
  name: string;
  action: () => void;
  type: string;
}

interface GameCardContainerProps {
  items: GameItem[];
}

const GameCardContainer = ({ items }: GameCardContainerProps) => {
  return (
    <div className={cn('flex', 'items-center', 'gap-24', 'w-full', 'mt-24')}>
      {items.map((item, index) => (
        <GameSelectionCard
          key={index}
          icon={item.icon}
          name={item.name}
          action={item.action}
          type={item.type}
        />
      ))}
    </div>
  );
};

export default GameCardContainer;
