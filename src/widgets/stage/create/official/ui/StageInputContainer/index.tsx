import { PointIcon } from '@/shared/assets/svg';
import { preventInvalidInputNumber } from '@/shared/model/preventInvalidInputNumber';
import Input from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';

const StageInputContainer = () => {
  return (
    <div className={cn('space-y-16')}>
      <p className={cn('text-white', 'text-body2e')}>스테이지</p>
      <div className={cn('flex', 'gap-24', 'tablet:flex-wrap')}>
        <Input placeholder="이름을 입력해주세요." maxLength={10} />
        <Input
          placeholder="초기 보유 포인트"
          icon={<PointIcon fill="#898989" />}
          type="number"
          onInput={preventInvalidInputNumber}
        />
      </div>
    </div>
  );
};

export default StageInputContainer;
