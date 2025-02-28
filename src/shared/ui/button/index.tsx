import { cn } from '@/shared/utils/cn';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: string;
}

const Button = ({ children, ...attributes }: ButtonProps) => {
  return (
    <button
      {...attributes}
      className={cn(
        'h-[56px]',
        'w-full',
        'rounded-lg',
        'disabled:bg-gray-400',
        'bg-main-600',
        'text-white',
      )}
    >
      {children}
    </button>
  );
};

export default Button;
