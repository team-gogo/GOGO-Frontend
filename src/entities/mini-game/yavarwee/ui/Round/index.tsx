import { cn } from '@/shared/utils/cn';

const Round = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn('px-20', 'py-12', 'text-white', 'text-body2s')}>
      {children}
    </div>
  );
};

export default Round;
