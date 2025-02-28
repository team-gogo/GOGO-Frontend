import { forwardRef } from 'react';
import { cn } from '@/shared/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, ...attributes }, ref) => (
    <div className={cn('h-[56px]', 'w-full', 'relative')}>
      <input
        type="text"
        {...attributes}
        ref={ref}
        className={cn(
          'h-full',
          'w-full',
          'bg-gray-700',
          'px-[16px]',
          'py-[12px]',
          'text-white',
          'placeholder:text-gray-400',
          'rounded-lg',
        )}
      />
      {icon && (
        <div
          className={cn(
            'absolute',
            'right-[16px]',
            'top-[50%]',
            'translate-y-[-50%]',
          )}
        >
          {icon}
        </div>
      )}
    </div>
  ),
);

Input.displayName = 'Input';

export default Input;
