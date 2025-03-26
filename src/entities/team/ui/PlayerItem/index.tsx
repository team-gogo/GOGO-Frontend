import PlayerIcon from '@/shared/assets/svg/PlayerIcon';
import DeleteIcon from '@/shared/assets/svg/DeleteIcon';
import { cn } from '@/shared/utils/cn';

interface PlayerItemProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
  isDragging?: boolean;
  isDeleteMode?: boolean;
  onDelete?: () => void;
}

const PlayerItem = ({
  name,
  className,
  style,
  isDragging,
  isDeleteMode,
  onDelete,
}: PlayerItemProps) => {
  return (
    <div
      style={{
        ...style,
        zIndex: isDragging ? 99999 : 'auto',
      }}
      className={cn(
        'relative flex h-[100px] w-[100px] flex-col items-center justify-center rounded-full border-[#2a2a2a] bg-[#2a2a2a] p-10 text-center text-white transition-all duration-200',
        isDragging && 'scale-110 shadow-lg',
        className,
      )}
    >
      {isDeleteMode && (
        <button
          className="absolute -left-1 -top-1 z-10 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
          style={{ transform: 'scale(0.8)' }}
        >
          <DeleteIcon />
        </button>
      )}
      <PlayerIcon className="mb-1" />
      <span className="max-w-[80px] overflow-hidden text-ellipsis whitespace-nowrap text-body3s text-white">
        {name}
      </span>
    </div>
  );
};

export default PlayerItem;
