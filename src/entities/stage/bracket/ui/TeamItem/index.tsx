import { cn } from '@/shared/utils/cn';

interface TeamItemProps {
  teamName?: string;
  className?: string;
  isEmpty?: boolean;
}

const TeamItem = ({
  teamName = 'TBD',
  className,
  isEmpty = false,
}: TeamItemProps) => {
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
        isEmpty && 'opacity-30',
        className,
      )}
    >
      {isEmpty ? '' : teamName}
    </div>
  );
};

export default TeamItem;
