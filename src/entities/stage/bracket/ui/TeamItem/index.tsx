import DeleteIcon from '@/shared/assets/svg/DeleteIcon';
import { cn } from '@/shared/utils/cn';

interface TeamItemProps {
  teamName?: string;
  className?: string;
  isEmpty?: boolean;
  deleteMode?: boolean;
  onDelete?: () => void;
}

const TeamItem = ({
  teamName,
  className,
  isEmpty = false,
  deleteMode = false,
  onDelete,
}: TeamItemProps) => {
  if (isEmpty) {
    return (
      <div
        className={cn(
          'w-[180px]',
          'h-[48px]',
          'rounded-lg',
          'bg-gray-600',
          'flex',
          'items-center',
          'justify-center',
          'text-body1',
          'text-white',
          'opacity-40',
          'border',
          'border-gray-500',
          className,
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        'w-[180px]',
        'h-[48px]',
        'rounded-lg',
        'bg-gray-600',
        'flex',
        'items-center',
        'justify-center',
        'text-body1',
        'text-white',
        'relative',
        className,
      )}
    >
      {teamName || 'TBD'}

      {deleteMode && teamName && teamName !== 'TBD' && (
        <button
          onClick={onDelete}
          className="absolute -right-3 -top-3 h-6 w-6 cursor-pointer"
        >
          <DeleteIcon />
        </button>
      )}
    </div>
  );
};

export default TeamItem;
