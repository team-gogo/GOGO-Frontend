import { PointIcon } from '@/shared/assets/svg';
import Input from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';

const StageInputContainer = () => {
  return (
    <div className={cn('space-y-16')}>
      <p className={cn('text-white', 'text-body2e')}>스테이지</p>
      <div className={cn('flex', 'gap-24')}>
        <Input placeholder="이름을 입력해주세요." maxLength={20} />
        <Input
          placeholder="초기 보유 포인트"
          type="number"
          icon={<PointIcon fill="#898989" />}
        />
      </div>
    </div>
  );
};

export default StageInputContainer;
