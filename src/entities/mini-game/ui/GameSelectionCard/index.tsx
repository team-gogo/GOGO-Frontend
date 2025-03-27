import { ReactNode, useState } from 'react';
import { CircleQuestionIcon } from '@/shared/assets/icons';
import { GameType } from '@/shared/model/sportTypes';
import { GameTicket } from '@/shared/types/mini-game';
import Button from '@/shared/ui/button';
import MiniGameDescriptionModal from '@/shared/ui/MiniGameDescriptionModal';
import { cn } from '@/shared/utils/cn';

interface GameSelectionCardProps {
  icon: (isActive: boolean) => ReactNode;
  name: string;
  type: string;
  isActive: boolean;
  ticketCount?: number;
  shopTicket?: GameTicket;
  myPoint?: number;
  action?: () => void;
  isPending?: boolean;
}

const GameSelectionCard = ({
  icon,
  name,
  type,
  isActive,
  ticketCount,
  shopTicket,
  myPoint,
  action,
  isPending,
}: GameSelectionCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedGame, setSelectedGame] = useState<GameType | null>('YAVARWEE');

  const ticketPrice = shopTicket?.ticketPrice;

  const toggleGameSelection = (sort: GameType) => {
    setSelectedGame((prev) => (prev === sort ? null : sort));
  };

  let buttonDisabled = false;
  let buttonText = '';

  if (type === 'game') {
    if (!isActive) {
      buttonDisabled = true;
      buttonText = '게임 불가';
    } else if (ticketCount === undefined || ticketCount <= 0) {
      buttonDisabled = true;
      buttonText = '게임 티켓을 구매하세요';
    } else {
      buttonDisabled = false;
      buttonText = '게임하기';
    }
  } else if (type === 'store') {
    if (!isActive || shopTicket === null) {
      buttonDisabled = true;
      buttonText = '구매 불가';
    } else if (myPoint === undefined || myPoint < (ticketPrice ?? Infinity)) {
      buttonDisabled = true;
      if (myPoint === undefined) {
        buttonText = '포인트 정보 없음';
      } else {
        buttonText = '포인트 부족';
      }
    } else if (shopTicket?.ticketQuantity === 0) {
      buttonDisabled = true;
      buttonText = '재고 부족';
    } else if (isPending) {
      buttonDisabled = true;
      buttonText = '구매중...';
    } else {
      buttonDisabled = false;
      buttonText = `${ticketPrice}P`;
    }
  }

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
          {icon(!buttonDisabled)}
          <p
            className={cn(
              'text-h4s',
              !buttonDisabled ? 'text-white' : 'text-gray-400',
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
        <Button disabled={buttonDisabled} onClick={action}>
          {buttonText}
        </Button>
        {type === 'store' && (
          <div className={cn('flex', 'items-center', 'justify-center')}>
            <p className={cn('text-body3s', 'text-gray-500')}>
              구매가능한 티켓 양 : {shopTicket?.ticketQuantity || 0}
            </p>
          </div>
        )}
      </div>
      {isModalOpen && (
        <MiniGameDescriptionModal
          onClose={() => setIsModalOpen(false)}
          selectedGame={selectedGame}
          toggleGameSelection={toggleGameSelection}
        />
      )}
    </div>
  );
};

export default GameSelectionCard;
