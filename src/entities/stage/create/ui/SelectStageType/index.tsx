import { ReactNode, useState } from 'react';
import { CircleQuestionIcon } from '@/shared/assets/icons';
import { GameType } from '@/shared/model/sportTypes';
import MiniGameDescriptionModal from '@/shared/ui/MiniGameDescriptionModal';
import { cn } from '@/shared/utils/cn';

interface SelectStageTypeProps {
  icon: ReactNode;
  name: string;
  isSelected: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isFastMode?: boolean;
}

const SelectStageType = ({
  icon,
  name,
  isSelected,
  onClick,
  isFastMode = false,
}: SelectStageTypeProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedGame, setSelectedGame] = useState<GameType | null>(
    isFastMode ? 'COINTOSS' : 'YAVARWEE',
  );

  const toggleGameSelection = (sort: GameType) => {
    setSelectedGame((prev) => (prev === sort ? null : sort));
  };

  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          'rounded-lg',
          'bg-gray-700',
          'w-full',
          'h-[12.75rem]',
          'relative',
          'flex',
          'items-center',
          'justify-center',
          'border-2',
          'border-solid',
          isSelected ? 'border-main-500' : 'border-transparent',
        )}
      >
        <div className={cn('flex', 'flex-col', 'items-center', 'gap-16')}>
          {icon}
          <p className={cn('text-h4s', 'text-gray-400')}>{name}</p>
        </div>
        <label
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
          className={cn('absolute', 'right-12', 'top-24', 'cursor-pointer')}
        >
          <CircleQuestionIcon />
        </label>
      </button>
      {isModalOpen && (
        <MiniGameDescriptionModal
          onClose={(e) => {
            e.stopPropagation();
            setIsModalOpen(false);
          }}
          selectedGame={selectedGame}
          toggleGameSelection={toggleGameSelection}
          isFastMode={isFastMode}
        />
      )}
    </div>
  );
};

export default SelectStageType;
