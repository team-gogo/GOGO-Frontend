'use client';

import { useState, forwardRef } from 'react';
import { ArrowDownIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

type Option = {
  value: string;
  label: string;
};

interface SelectOptionProps
  extends React.InputHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  initialLabel?: string;
}

const SelectOption = forwardRef<HTMLSelectElement, SelectOptionProps>(
  (
    { options, initialLabel = '선택하세요', onChange, value, name, ...props },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedLabel, setSelectedLabel] = useState<string>(
      value
        ? options.find((opt) => opt.value === value)?.label || initialLabel
        : options.length > 0
          ? options[0].label
          : initialLabel,
    );

    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = (value: string, label: string) => () => {
      setSelectedLabel(label);
      setIsOpen(false);

      if (onChange) {
        const event = {
          target: {
            name,
            value,
          },
        } as React.ChangeEvent<HTMLSelectElement>;

        onChange(event);
      }
    };

    return (
      <div className="relative w-full">
        <select
          ref={ref}
          name={name}
          value={value}
          onChange={onChange}
          className="hidden"
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <button
          type="button"
          className={cn(
            'flex',
            'items-center',
            'justify-between',
            'rounded-lg',
            'bg-gray-700',
            'px-16',
            'py-12',
            'h-[3.5rem]',
            'w-full',
          )}
          onClick={toggling}
        >
          <span className={cn('text-body3s', 'text-white')}>
            {selectedLabel}
          </span>
          <ArrowDownIcon size={24} color="#fff" />
        </button>

        {isOpen && (
          <ul
            className={cn(
              'absolute',
              'left-0',
              'right-0',
              'mt-4',
              'rounded-md',
              'shadow-lg',
              'px-16',
              'py-24',
              'bg-gray-700',
              'w-full',
              'space-y-10',
              'z-10',
            )}
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                className={cn(
                  'cursor-pointer',
                  'text-body3e',
                  selectedLabel === option.label
                    ? 'text-white'
                    : 'text-gray-400',
                  index < options.length - 1
                    ? 'border-b-1 border-solid border-gray-600 pb-12'
                    : '',
                )}
                onClick={onOptionClicked(option.value, option.label)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);

SelectOption.displayName = 'SelectOption';

export default SelectOption;
