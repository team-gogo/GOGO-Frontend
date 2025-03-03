import { cn } from '@/shared/utils/cn';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: string;
  bg?: string;
  textColor?: string;
}

const Button = ({
  children,
  bg = 'bg-main-600',
  textColor = 'text-white',
  ...attributes
}: ButtonProps) => {
  return (
    <button
      {...attributes}
      className={cn(
        'h-[56px]',
        'w-full',
        'rounded-lg',
        'disabled:bg-gray-400',
        bg,
        textColor,
        'text-body3s',
      )}
    >
      {children}
    </button>
  );
};

export default Button;
