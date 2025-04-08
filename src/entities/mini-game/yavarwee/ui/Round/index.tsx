import { cn } from '@/shared/utils/cn';

const Round = ({
  children,
  isCurrent = false,
}: {
  children: React.ReactNode;
  isCurrent?: boolean;
}) => {
  return (
    <div
      className={cn(
        'px-20',
        'py-12',
        'text-body2s',
        'text-white',
        isCurrent ? 'border-b-1 border-solid border-white' : '',
      )}
    >
      {children}
    </div>
  );
};

export default Round;
