'use client';

import { useState } from 'react';
import { ArrowDownIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

type Option = {
  value: string;
  label: string;
};

interface SelectOptionProps {
  options: Option[];
  initialLabel?: string;
}

const SelectOption = ({
  options,
  initialLabel = '선택하세요',
}: SelectOptionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>(initialLabel);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value: string, label: string) => () => {
    setSelectedOption(label);
    setIsOpen(false);
  };

  return (
    <div>
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
          'max-w-[12.5rem]',
          'h-[3.5rem]',
          'w-full',
        )}
        onClick={toggling}
      >
        <span className={cn('text-body3s', 'text-white')}>
          {selectedOption}
        </span>
        <ArrowDownIcon size={24} color="#fff" />
      </button>
      {isOpen && (
        <ul
          className={cn(
            'absolute',
            'mt-4',
            'rounded-md',
            'shadow-lg',
            'px-16',
            'py-24',
            'bg-gray-700',
            'max-w-[12.5rem]',
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
                selectedOption === option.label
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
};

export default SelectOption;
