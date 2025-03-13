import { ReactNode } from 'react';
import { CircleQuestionIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

interface SelectStageTypeProps {
  icon: ReactNode;
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

const SelectStageType = ({
  icon,
  name,
  isSelected,
  onClick,
}: SelectStageTypeProps) => {
  return (
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
        isSelected ? 'border-[#526FFE]' : 'border-transparent',
      )}
    >
      <div className={cn('flex', 'flex-col', 'items-center', 'gap-16')}>
        {icon}
        <p className={cn('text-h4s', 'text-gray-400')}>{name}</p>
      </div>
      <label className={cn('absolute', 'right-12', 'top-24')}>
        <CircleQuestionIcon />
      </label>
    </button>
  );
};

export default SelectStageType;
