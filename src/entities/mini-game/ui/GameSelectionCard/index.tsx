import { ReactNode, useState } from 'react';
import { CircleQuestionIcon } from '@/shared/assets/icons';
import { GameType } from '@/shared/model/sportTypes';
import { GameTicket } from '@/shared/types/mini-game';
import Button from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';
import MiniGameModal from '../MiniGameModal';

interface GameSelectionCardProps {
  icon: (isActive: boolean) => ReactNode;
  name: string;
  action: () => void;
  type: string;
  isActive: boolean;
  ticketCount?: number;
  shopTicket?: GameTicket;
}

const GameSelectionCard = ({
  icon,
  name,
  action,
  type,
  isActive,
  ticketCount,
  shopTicket,
}: GameSelectionCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedGame, setSelectedGame] = useState<GameType | null>('YAVARWEE');

  const ticketPrice = String(shopTicket?.ticketPrice);
  const ticketAmount = String(shopTicket?.ticketQuantity);

  const toggleGameSelection = (sort: GameType) => {
    setSelectedGame((prev) => (prev === sort ? null : sort));
  };

  return (
    <div className={cn('space-y-16', 'flex-1')}>
      <div
        className={cn(
          'flex',
          'justify-center',
          'items-center',
          'bg-gray-700',
          'py-[40px]',
          'relative',
          'rounded-lg',
        )}
      >
        <div
          className={cn(
            'flex',
            'justify-center',
            'items-center',
            'flex-col',
            'gap-16',
          )}
        >
          {icon(isActive)}
          <p
            className={cn(
              'text-h4s',
              isActive ? 'text-white' : 'text-gray-400',
            )}
          >
            {name}
          </p>
          <button
            type="button"
            className={cn('absolute', 'top-24', 'right-12')}
            onClick={() => setIsModalOpen(true)}
          >
            <CircleQuestionIcon />
          </button>
        </div>
      </div>
      <div className={cn('gap-[0.5rem]', 'flex', 'flex-col')}>
        <Button disabled={!isActive || ticketCount === 0} onClick={action}>
          {ticketCount === 0
            ? '게임 티켓을 구매하세요'
            : isActive
              ? type === 'game'
                ? '게임하기'
                : `${ticketPrice}P`
              : type === 'game'
                ? '게임불가'
                : '구매불가'}
        </Button>
        {shopTicket && (
          <div className={cn('flex', 'items-center', 'justify-center')}>
            <p className={cn('text-body3s', 'text-gray-500')}>
              구매가능한 티켓 양 : {ticketAmount}
            </p>
          </div>
        )}
      </div>
      {isModalOpen && (
        <MiniGameModal
          onClose={() => setIsModalOpen(false)}
          selectedGame={selectedGame}
          toggleGameSelection={toggleGameSelection}
        />
      )}
    </div>
  );
};
export default GameSelectionCard;
