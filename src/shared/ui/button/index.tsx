import { LockIcon } from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  bg?: string;
  textColor?: string;
  isLocked?: boolean;
  border?: string;
}

const Button = ({
  children,
  bg = 'bg-main-600',
  textColor = 'text-white',
  isLocked,
  border,
  ...attributes
}: ButtonProps) => {
  return (
    <button
      type="button"
      {...attributes}
      className={cn(
        'h-[56px]',
        'w-full',
        'rounded-lg',
        'disabled:bg-gray-400',
        bg,
        textColor,
        'text-body3s',
        border && 'border-1',
        border && 'border-solid',
        border,
      )}
    >
      <div
        className={cn(
          'flex',
          'w-full',
          'items-center',
          'justify-center',
          'gap-[0.5rem]',
        )}
      >
        {isLocked && <LockIcon />}
        {children}
      </div>
    </button>
  );
};

export default Button;
