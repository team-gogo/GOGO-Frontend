import React from 'react';
import { EtcIcon } from '@/shared/assets/svg';
import { SPORT_TYPES } from '@/shared/model/sportTypes';
import { cn } from '@/shared/utils/cn';

interface SportTypeLabelProps {
  type: string;
  asButton?: boolean;
  isSelected?: boolean;
  isMainUsed?: boolean;
  onClick?: () => void;
  isHaveBorder?: boolean;
}

const SportTypeLabel = ({
  type,
  asButton = false,
  isSelected = false,
  isMainUsed,
  onClick,
  isHaveBorder = false,
}: SportTypeLabelProps) => {
  const { icon, text } = SPORT_TYPES[type] || {
    icon: (color) => <EtcIcon color={color} />,
    text: '기타',
  };

  const borderStyle = [
    'tablet:px-[1rem]',
    'tablet:py-[0.75rem]',
    'p-[0.25rem]',
    'px-[0.5rem]',
    'rounded-lg',
    'border-1',
    'border-solid',
    'border-main-500',
  ];

  const commonClasses = cn(
    'w-fit',
    'flex',
    'gap-8',
    'text-nowrap',
    'items-center',
    isMainUsed ? 'tablet:h-[2.3125rem]' : 'tablet:h-[2.8125rem]',
    'h-[1.875rem]',
    {
      'bg-main-500 text-white': asButton && isSelected,
      'cursor-pointer': asButton,
    },
    isHaveBorder && borderStyle,
  );

  const iconColor = asButton && isSelected ? 'white' : '#526FFE';
  const textColor = asButton && isSelected ? 'text-white' : 'text-main-500';

  const content = (
    <>
      {icon && <label>{icon(iconColor)}</label>}
      <p
        className={cn(
          'tablet:text-body3s',
          'leading-[1.3125rem]',
          'text-caption2s',
          textColor,
        )}
      >
        {text}
      </p>
    </>
  );

  return asButton ? (
    <button type="button" className={commonClasses} onClick={onClick}>
      {content}
    </button>
  ) : (
    <div className={commonClasses}>{content}</div>
  );
};

export default SportTypeLabel;
