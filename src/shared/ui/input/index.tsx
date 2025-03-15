'use client';

import { forwardRef, useState } from 'react';
import { cn } from '@/shared/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  maxLength?: number;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, maxLength, ...attributes }, ref) => {
    const [inputLength, setInputLength] = useState(0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (maxLength && value.length > maxLength) {
        e.target.value = value.slice(0, maxLength);
      }
      setInputLength(e.target.value.length);
      if (attributes.onChange) {
        attributes.onChange(e);
      }
    };

    return (
      <div className={cn('h-[56px]', 'w-full', 'relative')}>
        <input
          type="text"
          {...attributes}
          ref={ref}
          maxLength={maxLength}
          onChange={handleInputChange}
          className={cn(
            'h-full',
            'w-full',
            'bg-gray-700',
            'px-[16px]',
            'pl-[12px]',
            icon ? 'pr-[50px]' : 'pr-[12px]',
            'placeholder:text-gray-400',
            'rounded-lg',
            'text-body3s',
            'text-white',
            attributes.type === 'number' &&
              '[appearance:none] [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden',
          )}
        />
        {icon && (
          <button
            type="button"
            className={cn(
              'absolute',
              'right-[16px]',
              'top-[50%]',
              'translate-y-[-50%]',
            )}
          >
            {icon}
          </button>
        )}
        {maxLength && (
          <div className={cn('text-body3s', 'text-end', 'text-gray-500')}>
            {inputLength}/{maxLength}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
