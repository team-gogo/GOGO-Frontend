import { cn } from '@/shared/utils/cn';

interface TeamItemProps {
  teamName?: string;
  className?: string;
  isEmpty?: boolean;
}

const TeamItem = ({ teamName, className, isEmpty = false }: TeamItemProps) => {
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
        className,
      )}
    >
      {teamName || 'TBD'}
    </div>
  );
};

export default TeamItem;
