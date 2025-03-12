import Input from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';

const RuleInputContainer = () => {
  return (
    <div className={cn('space-y-16')}>
      <p className={cn('text-white', 'text-body2e')}>규칙</p>
      <div className={cn('space-y-24')}>
        <Input placeholder="최소 보유 포인트" type="number" />
        <Input placeholder="최대 보유 포인트" type="number" />
      </div>
    </div>
  );
};

export default RuleInputContainer;
