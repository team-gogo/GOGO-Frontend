import {
  AdminIcon,
  ClockIcon,
  LiveSettingIcon,
  OfficialIcon,
  RecruitIcon,
  TeamConfirmIcon,
} from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';

interface TagProps {
  TagType?:
    | 'OFFICIAL'
    | 'FAST'
    | 'ADMIN'
    | 'CONFIRMED'
    | 'STREAMING'
    | 'RECRUITING'
    | 'TIME'
    | 'LIVE'
    | 'FINISH';

  text?: string;
}

const Tag = ({ TagType = 'OFFICIAL', text }: TagProps) => {
  const defaultStyle = {
    text: 'text-white',
    border: 'border-white',
    Icon: OfficialIcon,
  };

  const tagStyles = {
    OFFICIAL: defaultStyle,
    FAST: defaultStyle,
    ADMIN: {
      text: 'text-main-500',
      border: 'border-main-500',
      Icon: AdminIcon,
    },
    CONFIRMED: {
      text: 'text-gray-400',
      border: 'border-gray-400',
      Icon: TeamConfirmIcon,
    },
    STREAMING: {
      text: 'text-system-error',
      border: 'border-system-error',
      Icon: LiveSettingIcon,
    },
    RECRUITING: {
      text: 'text-system-success',
      border: 'border-system-success',
      Icon: RecruitIcon,
    },
    TIME: {
      text: 'text-white',
      border: 'border-white',
      Icon: ClockIcon,
    },
    LIVE: {
      text: 'text-system-success',
      border: 'border-system-success',
      Icon: ClockIcon,
    },
    FINISH: {
      text: 'text-gray-400',
      border: 'border-gray-400',
      Icon: ClockIcon,
    },
  };

  const tagTexts = {
    OFFICIAL: '공식',
    FAST: '사설',
    ADMIN: '관리자',
    CONFIRMED: '모집 확정',
    STREAMING: '중계 설정',
    RECRUITING: '모집 중',
    TIME: text,
    LIVE: '경기 중',
    FINISH: '종료됨',
  };

  const selectedStyle = tagStyles[TagType] || defaultStyle;
  const IconComponent = selectedStyle.Icon;

  return (
    <div
      className={cn(
        'flex',
        'p-[0.75rem]',
        'px-[1rem]',
        'laptop:p-[0.25rem]',
        'laptop:px-[0.5rem]',
        'justify-center',
        'items-center',
        'gap-[0.5rem]',
        'rounded-lg',
        'border-[0.0625rem]',
        'border-solid',
        'h-[2.8125rem]',
        'laptop:h-[1.875rem]',
        selectedStyle.border,
      )}
    >
      <IconComponent
        isLive={TagType === 'LIVE'}
        isFinish={TagType === 'FINISH'}
      />
      <p
        className={cn(
          'text-caption1s',
          'laptop:text-caption3s',
          selectedStyle.text,
        )}
      >
        {text || tagTexts[TagType]}
      </p>
    </div>
  );
};

export default Tag;
