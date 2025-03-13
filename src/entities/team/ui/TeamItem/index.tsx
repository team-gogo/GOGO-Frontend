import { cn } from '@/shared/utils/cn';

import CheckboxIcon from '@/shared/assets/svg/CheckboxIcon';

interface TeamItemProps {
  teamName: string;
  onViewDetails: () => void;
  isSelected: boolean;
  onToggleSelect: () => void;
}

const TeamItem = ({
  teamName,
  onViewDetails,
  isSelected,
  onToggleSelect,
}: TeamItemProps) => {
  return (
    <div
      className={cn(
        'w-full',
        'py-20',
        'px-20',
        'bg-[#303030]',
        'rounded-[12px]',
        'flex',
        'justify-between',
        'items-center',
      )}
    >
      <div className="text-body2s text-gray-200">{teamName}</div>
      <div className="flex items-center gap-6">
        <button
          onClick={onViewDetails}
          className={cn(
            'text-gray-400',
            'text-body3s',
            'flex',
            'items-center',
            'gap-1',
            'transition-colors',
          )}
        >
          팀 자세히보기
        </button>
        <button
          onClick={onToggleSelect}
          className={cn(
            'flex',
            'items-center',
            'justify-center',
            'transition-colors',
            'w-30',
            'h-30',
          )}
        >
          <CheckboxIcon isChecked={isSelected} />
        </button>
      </div>
    </div>
  );
};

export default TeamItem;
