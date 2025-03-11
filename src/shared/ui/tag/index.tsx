import {
  AdminIcon,
  LiveSettingIcon,
  OfficialIcon,
  RecruitIcon,
  TeamConfirmIcon,
} from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';

interface TagProps {
  TagType:
    | 'OFFICIAL'
    | 'FAST'
    | 'ADMIN' // ADMIN ROLE은 따로 유저 정보 불러오기를 통해 처리해야함
    | 'CONFIRMED'
    | 'STREAMING' //streaming 기능은 확정 X 퍼블리싱만 O
    | 'RECRUITING';
}

const Tag = ({ TagType }: TagProps) => {
  const tagStyles = {
    OFFICIAL: {
      text: 'text-white',
      border: 'border-white',
      Icon: OfficialIcon,
    },
    FAST: {
      text: 'text-white',
      border: 'border-white',
      Icon: OfficialIcon,
    },
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
  };

  const tagTexts = {
    OFFICIAL: '공식',
    FAST: '사설',
    ADMIN: '관리자',
    CONFIRMED: '모집 확정',
    STREAMING: '중계 설정',
    RECRUITING: '모집 중',
  };

  const IconComponent = tagStyles[TagType].Icon;

  return (
    <button
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
        tagStyles[TagType].border,
      )}
    >
      <IconComponent />
      <p
        className={cn(
          'text-caption1s',
          'laptop:text-caption3s',
          tagStyles[TagType].text,
        )}
      >
        {tagTexts[TagType]}
      </p>
    </button>
  );
};

export default Tag;
