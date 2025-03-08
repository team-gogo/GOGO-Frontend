import React from 'react';
import { EtcIcon } from '@/shared/assets/svg';
import { SPORT_TYPES } from '@/shared/model/sportTypes';
import { cn } from '@/shared/utils/cn';

interface SportTypeLabelProps {
  type: string;
  asButton?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

const SportTypeLabel = ({
  type,
  asButton = false,
  isSelected = false,
  onClick,
}: SportTypeLabelProps) => {
  const { icon, text } = SPORT_TYPES[type] || {
    icon: (color) => <EtcIcon color={color} />,
    text: '기타',
  };

  const commonClasses = cn(
    'py-8',
    'px-12',
    'rounded-lg',
    'border-1',
    'border-solid',
    'border-main-500',
    'w-fit',
    'flex',
    'gap-8',
    'text-nowrap',
    'items-center',
    {
      'bg-main-500 text-white': asButton && isSelected,
      'cursor-pointer': asButton,
    },
  );

  const iconColor = asButton && isSelected ? 'white' : '#526FFE';
  const textColor = asButton && isSelected ? 'text-white' : 'text-main-500';

  const content = (
    <>
      {icon && <label>{icon(iconColor)}</label>}
      <p className={cn('text-body3s', textColor)}>{text}</p>
    </>
  );

  return asButton ? (
    <button className={commonClasses} onClick={onClick}>
      {content}
    </button>
  ) : (
    <div className={commonClasses}>{content}</div>
  );
};

export default SportTypeLabel;
