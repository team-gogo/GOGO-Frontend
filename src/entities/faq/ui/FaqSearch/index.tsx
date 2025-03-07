import { forwardRef } from 'react';
import { SearchIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const FaqSearch = forwardRef<HTMLInputElement, InputProps>(
  ({ ...attributes }, ref) => (
    <div className={cn('h-[56px]', 'w-full', 'relative')}>
      <input
        type="text"
        {...attributes}
        ref={ref}
        className={cn(
          'h-full',
          'w-full',
          'py-22',
          'bg-transparent',
          'border-b-1',
          'border-solid',
          'border-gray-700',
          'placeholder:text-gray-500',
          'text-body1s',
          'text-white',
        )}
      />

      <button
        type="button"
        className={cn(
          'absolute',
          'right-[16px]',
          'top-[50%]',
          'translate-y-[-50%]',
        )}
      >
        <SearchIcon />
      </button>
    </div>
  ),
);

FaqSearch.displayName = 'FaqSearch';

export default FaqSearch;
