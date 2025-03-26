import { cn } from '@/shared/utils/cn';

interface TeamItemProps {
  teamName?: string;
  className?: string;
}

const TeamItem = ({ teamName = 'TBD', className }: TeamItemProps) => {
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
      {teamName}
    </div>
  );
};

export default TeamItem;
