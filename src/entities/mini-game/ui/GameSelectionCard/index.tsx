import { ReactNode } from 'react';
import { CircleQuestionIcon } from '@/shared/assets/icons';
import Button from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';

interface GameSelectionCardProps {
  icon: ReactNode;
  name: string;
  action: () => void;
  type: string;
}

const GameSelectionCard = ({
  icon,
  name,
  action,
  type,
}: GameSelectionCardProps) => {
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
          {icon}
          <p className={cn('text-h4s', 'text-gray-400')}>{name}</p>
          <button
            type="button"
            className={cn('absolute', 'top-24', 'right-12')}
          >
            <CircleQuestionIcon />
          </button>
        </div>
      </div>
      <Button onClick={action}>
        {type === 'game' ? '게임하기' : '구매하기'}
      </Button>
    </div>
  );
};

export default GameSelectionCard;
