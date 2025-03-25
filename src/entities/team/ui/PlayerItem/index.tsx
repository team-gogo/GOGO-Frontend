import PlayerIcon from '@/shared/assets/svg/PlayerIcon';
import { cn } from '@/shared/utils/cn';

interface PlayerItemProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
  isDragging?: boolean;
}

const PlayerItem = ({
  name,
  className,
  style,
  isDragging,
}: PlayerItemProps) => {
  return (
    <div
      style={{
        ...style,
        zIndex: isDragging ? 99999 : 'auto',
      }}
      className={cn(
        'flex h-[100px] w-[100px] flex-col items-center justify-center rounded-full border-[#2a2a2a] bg-[#2a2a2a] p-10 text-center text-white transition-all duration-200',
        isDragging && 'scale-110 shadow-lg',
        className,
      )}
    >
      <PlayerIcon className="mb-1" />
      <span className="max-w-[80px] overflow-hidden text-ellipsis whitespace-nowrap text-body3s text-white">
        {name}
      </span>
    </div>
  );
};

export default PlayerItem;
