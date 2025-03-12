import { SelectStageType } from '@/entities/stage/create/official';
import { PointIcon } from '@/shared/assets/svg';
import Input from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';

const StoreContainer = () => {
  return (
    <div className={cn('space-y-16')}>
      <p className={cn('text-body2e', 'text-white')}>상점</p>
      <div className={cn('flex', 'items-center', 'gap-24')}>
        <div className={cn('space-y-16', 'w-full')}>
          <SelectStageType />
          <Input
            placeholder="야바위 티켓 포인트"
            icon={<PointIcon fill="#898989" />}
          />
        </div>
        <div className={cn('space-y-16', 'w-full')}>
          <SelectStageType />
          <Input
            placeholder="코인토스 티켓 포인트"
            icon={<PointIcon fill="#898989" />}
          />
        </div>
        <div className={cn('space-y-16', 'w-full')}>
          <SelectStageType />
          <Input
            placeholder="플린코 티켓 포인트"
            icon={<PointIcon fill="#898989" />}
          />
        </div>
      </div>
    </div>
  );
};

export default StoreContainer;
