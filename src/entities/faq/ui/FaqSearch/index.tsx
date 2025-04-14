import { forwardRef } from 'react';
import { SearchIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch: (query: string) => void;
}

const FaqSearch = forwardRef<HTMLInputElement, InputProps>(
  ({ onSearch, ...attributes }, ref) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearch(e.target.value);
    };

    return (
      <div className={cn('h-[56px]', 'w-full', 'relative')}>
        <input
          type="text"
          {...attributes}
          ref={ref}
          onChange={handleInputChange}
          className={cn(
            'h-full',
            'w-full',
            'py-22',
            'bg-transparent',
            'border-b-1',
            'border-solid',
            'border-gray-700',
            'placeholder:text-gray-500',
            'pad:text-body1s',
            'text-body3s',
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
          <SearchIcon
            className={cn(
              'pad:h-[40px]',
              'pad:w-[40px]',
              'h-[24px]',
              'w-[24px]',
            )}
          />
        </button>
      </div>
    );
  },
);

FaqSearch.displayName = 'FaqSearch';

export default FaqSearch;
