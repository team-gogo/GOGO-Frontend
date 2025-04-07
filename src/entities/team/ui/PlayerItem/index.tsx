import DeleteIcon from '@/shared/assets/svg/DeleteIcon';
import PlayerIcon from '@/shared/assets/svg/PlayerIcon';
import { cn } from '@/shared/utils/cn';

interface PlayerItemProps {
  name: string;
  team?: 'A' | 'B' | null;
  className?: string;
  style?: React.CSSProperties;
  isDragging?: boolean;
  isDeleteMode?: boolean;
  onDelete?: () => void;
}

const PlayerItem = ({
  name,
  team,
  className,
  style,
  isDragging,
  isDeleteMode,
  onDelete,
}: PlayerItemProps) => {
  const displayName = name.split(' ').pop()?.replace(/[0-9]/g, '') || '';

  const color = team === 'A' ? '#73B2FF' : team === 'B' ? '#FF8282' : '#FFF';

  return (
    <div
      style={{
        ...style,
        zIndex: isDragging ? 99999 : 'auto',
        backgroundColor: 'transparent',
      }}
      className={cn(
        'relative flex h-[100px] w-[100px] flex-col items-center justify-center rounded-full p-10 text-center text-white transition-all duration-200',
        isDragging && 'scale-110',
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
      <PlayerIcon className="mb-1" color={color} />
      <span
        className="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap text-body3s"
        style={{ color: color }}
      >
        {displayName}
      </span>
    </div>
  );
};

export default PlayerItem;
