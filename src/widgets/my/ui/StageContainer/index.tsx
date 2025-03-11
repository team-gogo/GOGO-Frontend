import Stage from '@/shared/ui/stage';
import { cn } from '@/shared/utils/cn';

const StageContainer = () => {
  return (
    <div className={cn('w-full', 'flex', 'flex-col', 'gap-[1.5rem]')}>
      <h2 className={cn('text-body1e', 'text-white')}>내가 참여한 스테이지</h2>
      <div
        className={cn('grid', 'grid-cols-2', 'gap-x-[2.5rem]', 'gap-y-[2rem]')}
      >
        <Stage isAdmin={true} isRecruiting={true} isLocked={true} />
        <Stage isAdmin={true} isRecruiting={true} isLocked={true} />
        <Stage isAdmin={true} isRecruiting={true} isLocked={true} />
        <Stage isAdmin={true} isRecruiting={true} isLocked={true} />
      </div>
    </div>
  );
};

export default StageContainer;
