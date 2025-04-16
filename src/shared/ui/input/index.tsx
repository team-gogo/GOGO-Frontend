'use client';

import { forwardRef, useState, useEffect } from 'react';
import { cn } from '@/shared/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  maxLength?: number;
  bgColor?: string;
  onIconClick?: () => void;
  showBorder?: boolean;
  isPlcCenter?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      icon,
      maxLength,
      bgColor = 'bg-gray-700',
      onIconClick,
      showBorder = false,
      isPlcCenter = false,
      value,
      ...attributes
    },
    ref,
  ) => {
    const [inputLength, setInputLength] = useState(0);

    useEffect(() => {
      setInputLength(typeof value === 'string' ? value.length : 0);
    }, [value]);

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
          autoComplete="off"
          className={cn(
            'h-full',
            'w-full',
            bgColor,
            'px-[16px]',
            'pl-[12px]',
            icon ? 'pr-[50px]' : 'pr-[12px]',
            'placeholder:text-gray-400',
            isPlcCenter && 'placeholder:text-center',
            'rounded-lg',
            'text-body3s',
            'text-white',
            showBorder && 'border border-solid border-gray-600',
            attributes.type === 'number' &&
              '[appearance:none] [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden',
          )}
        />
        {icon && (
          <label
            onClick={onIconClick}
            className={cn(
              'absolute',
              'right-[16px]',
              'top-[50%]',
              'translate-y-[-50%]',
              onIconClick && 'cursor-pointer',
            )}
          >
            {icon}
          </label>
        )}
        {maxLength && (
          <div
            className={cn(
              'text-body3s',
              'text-end',
              inputLength > 0 ? 'text-main-600' : 'text-gray-500',
            )}
          >
            {inputLength}/{maxLength}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
