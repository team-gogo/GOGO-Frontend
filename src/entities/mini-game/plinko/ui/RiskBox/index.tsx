import Button from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';

const RiskBox = () => {
  return (
    <div className={cn('flex', 'w-full', 'flex-col', 'gap-[1.5rem]')}>
      <h2 className={cn('text-body2e', 'text-white')}>리스크</h2>
      <div className={cn('flex', 'flex-row', 'w-full', 'gap-[0.75rem]')}>
        <Button>Low</Button>
        <Button>Medium</Button>
        <Button>High</Button>
      </div>
    </div>
  );
};

export default RiskBox;
