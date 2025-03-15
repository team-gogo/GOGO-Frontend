import { CreateIcon } from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';

interface CreateButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

const CreateButton = ({ children, ...attributes }: CreateButtonProps) => {
  return (
    <button
      type="button"
      {...attributes}
      className={cn(
        'h-[3.75rem]',
        'rounded-lg',
        'text-body2s',
        'border-solid',
        'border-1',
        'border-main-400',
        'px-[1rem]',
      )}
    >
      <div
        className={cn(
          'flex',
          'w-full',
          'items-center',
          'justify-center',
          'gap-[0.75rem]',
          'text-main-400',
        )}
      >
        <CreateIcon />
        {children}
      </div>
    </button>
  );
};

export default CreateButton;
