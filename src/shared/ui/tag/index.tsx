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
    | 'official'
    | 'private'
    | 'admin'
    | 'teamConfirm'
    | 'liveSetting'
    | 'recruiting';
}

const Tag = ({ TagType }: TagProps) => {
  const tagStyles = {
    official: {
      text: 'text-white',
      border: 'border-white',
      Icon: OfficialIcon,
    },
    private: {
      text: 'text-white',
      border: 'border-white',
      Icon: OfficialIcon,
    },
    admin: {
      text: 'text-main-500',
      border: 'border-main-500',
      Icon: AdminIcon,
    },
    teamConfirm: {
      text: 'text-gray-400',
      border: 'border-gray-400',
      Icon: TeamConfirmIcon,
    },
    liveSetting: {
      text: 'text-system-error',
      border: 'border-system-error',
      Icon: LiveSettingIcon,
    },
    recruiting: {
      text: 'text-system-success',
      border: 'border-system-success',
      Icon: RecruitIcon,
    },
  };

  const tagTexts = {
    official: '공식',
    private: '사설',
    admin: '관리자',
    teamConfirm: '모집 확정',
    liveSetting: '중계 설정',
    recruiting: '모집 중',
  };

  const IconComponent = tagStyles[TagType].Icon;

  return (
    <button
      className={cn(
        'flex',
        'p-[0.75rem]',
        'px-[1rem]',
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
      <p className={cn('text-caption1s', tagStyles[TagType].text)}>
        {tagTexts[TagType]}
      </p>
    </button>
  );
};

export default Tag;
