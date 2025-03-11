import React from 'react';
import { EtcIcon } from '@/shared/assets/svg';
import { SPORT_TYPES } from '@/shared/model/sportTypes';
import { cn } from '@/shared/utils/cn';

interface SportTypeLabelProps {
  type: string;
  asButton?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  py?: string;
  px?: string;
  height?: string;
}

const SportTypeLabel = ({
  type,
  asButton = false,
  isSelected = false,
  onClick,
  py,
  px,
  height,
}: SportTypeLabelProps) => {
  const { icon, text } = SPORT_TYPES[type] || {
    icon: (color) => <EtcIcon color={color} />,
    text: '기타',
  };

  const commonClasses = cn(
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
      'laptop:h-[1.875rem]': !!height,
      'laptop:py-[0.25rem]': !!py,
      'laptop:px-[0.5rem]': !!px,
    },
    !py && 'py-8',
    !px && 'px-12',
    !height && 'h-auto',
  );

  const iconColor = asButton && isSelected ? 'white' : '#526FFE';
  const textColor = asButton && isSelected ? 'text-white' : 'text-main-500';

  const content = (
    <>
      {icon && <label>{icon(iconColor)}</label>}
      <p className={cn('text-body3s', 'leading-[1.3125rem]', textColor)}>
        {text}
      </p>
    </>
  );

  return asButton ? (
    <button
      type="button"
      className={commonClasses}
      onClick={onClick}
      style={{
        paddingTop: py || undefined,
        paddingBottom: py || undefined,
        paddingLeft: px || undefined,
        paddingRight: px || undefined,
      }}
    >
      {content}
    </button>
  ) : (
    <div
      className={commonClasses}
      style={{
        paddingTop: py || undefined,
        paddingBottom: py || undefined,
        paddingLeft: px || undefined,
        paddingRight: px || undefined,
      }}
    >
      {content}
    </div>
  );
};

export default SportTypeLabel;
