import { CircleQuestionIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

interface MiniGameButtonProps {
  name: string;
  isActive: boolean;
  icon: ({ size, color }: { size: number; color: string }) => JSX.Element;
  onClick: () => void;
  width?: string;
  height?: string;
}

const MiniGameButton = ({
  name,
  isActive,
  icon: Icon,
  onClick,
  width = 'w-[424px]',
  height = 'h-[204px]',
}: MiniGameButtonProps) => {
  return (
    <button
      className={cn(
        width,
        height,
        'bg-gray-700',
        'text-title4s',
        'rounded-lg',
        'flex',
        'flex-col',
        'gap-16',
        'items-center',
        'justify-center',
        'relative',
        'border-2',
        'border-solid',
        isActive
          ? ['border-main-500', 'text-main-500']
          : ['border-gray-700', 'text-gray-400'],
      )}
      type="button"
      onClick={onClick}
    >
      <div className={cn('absolute', 'top-22', 'right-10')}>
        <CircleQuestionIcon />
      </div>
      <Icon size={60} color={isActive ? '#526ffe' : '#898989'} />
      {name}
    </button>
  );
};

export default MiniGameButton;
