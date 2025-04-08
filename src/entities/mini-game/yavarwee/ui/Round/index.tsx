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
        'pad:py-12',
        'pad:px-20',
        'py-6',
        'px-8',
        'text-caption1s',
        'mobile:text-caption1s',
        'pad:text-body3s',
        'midpad:text-body2s',
        isCurrent
          ? 'border-b-1 border-solid border-white text-white'
          : 'text-gray-500',
      )}
    >
      {children}
    </div>
  );
};

export default Round;
