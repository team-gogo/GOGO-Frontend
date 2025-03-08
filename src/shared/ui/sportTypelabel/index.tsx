import React from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@/shared/assets/icons';
import {
  BadmintonIcon,
  BaseballIcon,
  BasketballIcon,
  EtcIcon,
  LoLIcon,
  SoccerIcon,
  VolleyballIcon,
} from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';

const SPORT_TYPES: Record<
  string,
  { icon: (color?: string) => JSX.Element; text: string }
> = {
  soccer: { icon: (color) => <SoccerIcon color={color} />, text: '축구' },
  baseball: { icon: (color) => <BaseballIcon color={color} />, text: '야구' },
  basketball: {
    icon: (color) => <BasketballIcon color={color} />,
    text: '농구',
  },
  volleyball: {
    icon: (color) => <VolleyballIcon color={color} />,
    text: '배구',
  },
  lol: { icon: (color) => <LoLIcon color={color} />, text: '리그 오브 레전드' },
  badminton: {
    icon: (color) => <BadmintonIcon color={color} />,
    text: '배드민턴',
  },
  etc: { icon: (color) => <EtcIcon color={color} />, text: '기타(직접입력)' },
  newest: {
    icon: (color) => <ArrowUpIcon color={color || '#526FFE'} size={20} />,
    text: '최신순',
  },
  oldest: {
    icon: (color) => <ArrowDownIcon color={color || '#526FFE'} size={20} />,
    text: '오래된순',
  },
};

interface SportTypeLabelProps {
  type: string;
  asButton?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

const SportTypeLabel: React.FC<SportTypeLabelProps> = ({
  type,
  asButton = false,
  isSelected = false,
  onClick,
}) => {
  const { icon, text } = SPORT_TYPES[type] || {
    icon: () => null,
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
