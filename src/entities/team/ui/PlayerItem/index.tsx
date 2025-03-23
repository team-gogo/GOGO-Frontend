import PlayerIcon from '@/shared/assets/svg/PlayerIcon';
import { cn } from '@/shared/utils/cn';

interface PlayerItemProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}

const PlayerItem = ({ name, className, style }: PlayerItemProps) => {
  return (
    <div
      style={style}
      className={cn(
        'flex h-[100px] w-[100px] flex-col items-center justify-center rounded-full border-[#2a2a2a] bg-[#2a2a2a] p-10 text-center text-white',
        className,
      )}
    >
      <PlayerIcon className="mb-1" />
      <span className="text-body3s text-white">{name}</span>
    </div>
  );
};

export default PlayerItem;
