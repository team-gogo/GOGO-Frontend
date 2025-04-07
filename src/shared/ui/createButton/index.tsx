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
        'rounded-lg',
        'text-body2s',
        'border-solid',
        'border-1',
        'border-main-400',
        'pad:px-[1rem]',
        'pad:py-[0.75rem]',
        'px-[0.75rem]',
        'py-[0.5rem]',
      )}
    >
      <div
        className={cn(
          'flex',
          'w-full',
          'items-center',
          'justify-center',
          'pad:gap-[0.75rem]',
          'gap-[0.5rem]',
          'text-main-400',
          'pad:text-body3s',
          'text-caption3s',
        )}
      >
        <CreateIcon />
        {children}
      </div>
    </button>
  );
};

export default CreateButton;
