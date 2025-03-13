import { CirclePlusIcon } from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';

const AddButton = () => {
  return (
    <button
      type="button"
      className={cn(
        'border-1',
        'border-solid',
        'border-gray-400',
        'px-16',
        'py-12',
        'flex',
        'gap-8',
        'rounded-lg',
        'w-fit',
        'h-fit',
        'whitespace-nowrap',
      )}
    >
      <CirclePlusIcon />
      <p className={cn('text-gray-400', 'text-body3s', 'whitespace-nowrap')}>
        추가
      </p>
    </button>
  );
};

export default AddButton;
