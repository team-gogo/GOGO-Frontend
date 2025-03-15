import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import { PlinkoInputBox } from '@/widgets/mini-game';

const PlinkoPage = () => {
  return (
    <div
      className={cn(
        'flex',
        'w-full',
        'items-center',
        'justify-center',
        'px-[5rem]',
        'py-[5rem]',
      )}
    >
      <div
        className={cn(
          'w-full',
          'max-w-[82.5rem]',
          'flex',
          'flex-col',
          'gap-[5.3125rem]',
        )}
      >
        <BackPageButton type="push" path="/mini-game" label="플린코" />
        <div className={cn('flex', 'gap-[2.5rem]', 'flex-col')}>
          <PlinkoInputBox money={2000} ticket={2} />
        </div>
      </div>
    </div>
  );
};

export default PlinkoPage;
