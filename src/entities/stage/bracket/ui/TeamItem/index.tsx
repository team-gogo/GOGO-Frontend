import DeleteIcon from '@/shared/assets/svg/DeleteIcon';
import { cn } from '@/shared/utils/cn';

interface TeamItemProps {
  teamName?: string;
  className?: string;
  isEmpty?: boolean;
  isWinner?: boolean;
  deleteMode?: boolean;
  onDelete?: () => void;
}

const TeamItem = ({
  teamName,
  className,
  isEmpty = false,
  isWinner = false,
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
          'bg-[#404040]',
          'flex',
          'items-center',
          'justify-center',
          'text-body1',
          'text-white',
          'border',
          'border-gray-500',
          className,
        )}
      />
    );
  }

  if (isWinner) {
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
          'border-4',
          'border-solid',
          'border-main-600',
          className,
        )}
      >
        {teamName || 'TBD'}
      </div>
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
          className="absolute -top-3 left-36 h-1 w-1 cursor-pointer"
        >
          <DeleteIcon size={28} />
        </button>
      )}
    </div>
  );
};

export default TeamItem;
