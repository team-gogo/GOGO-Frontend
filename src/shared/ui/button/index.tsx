import { LockIcon } from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  bg?: string;
  textColor?: string;
  borderColor?: string;
  borderStyle?: string;
  isLocked?: boolean;
}

const Button = ({
  children,
  bg = 'bg-main-600',
  textColor = 'text-white',
  borderColor = 'none',
  borderStyle = 'none',
  isLocked,
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
        borderStyle,
        borderColor,
        'text-body3s',
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
