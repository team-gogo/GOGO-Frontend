import { CircleQuestionIcon, ShellGameIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

const SelectStageType = () => {
  return (
    <button
      className={cn(
        'rounded-lg',
        'bg-gray-700',
        'w-full',
        'h-[12.75rem]',
        'relative',
        'flex',
        'items-center',
        'justify-center',
      )}
    >
      <div className={cn('flex', 'flex-col', 'items-center', 'gap-16')}>
        <ShellGameIcon size={60} color="#898989" />
        <p className={cn('text-h4s', 'text-gray-400')}>야바위</p>
      </div>
      <label className={cn('absolute', 'right-12', 'top-24')}>
        <CircleQuestionIcon />
      </label>
    </button>
  );
};

export default SelectStageType;
