import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';

const MatchApplyPage = () => {
  return (
    <div
      className={cn(
        'flex',
        'w-full',
        'flex-col',
        'items-center',
        'justify-center',
        'py-[2rem]',
        'px-[1rem]',
      )}
    >
      <div
        className={cn(
          'flex',
          'flex-col',
          'w-full',
          'max-w-[82.5rem]',
          'gap-[3.75rem]',
        )}
      >
        <BackPageButton />
      </div>
    </div>
  );
};

export default MatchApplyPage;
