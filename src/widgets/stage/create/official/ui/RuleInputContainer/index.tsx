import { UseFormRegister } from 'react-hook-form';
import { OfficialStageData } from '@/shared/types/stage/create/official';
import Input from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';

interface Props {
  register: UseFormRegister<OfficialStageData>;
}

const RuleInputContainer = ({ register }: Props) => {
  return (
    <div className={cn('space-y-16')}>
      <p className={cn('text-white', 'text-body2e')}>규칙</p>
      <div className={cn('space-y-24')}>
        <Input
          {...register('rule.minBettingPoint', {
            required: '최소 보유 포인트는 필수입니다.',
            valueAsNumber: true,
            min: { value: 0, message: '0 이상의 값을 입력해주세요.' },
          })}
          placeholder="최소 보유 포인트"
          type="number"
        />
        <Input
          {...register('rule.maxBettingPoint', {
            required: '최대 보유 포인트는 필수입니다.',
            valueAsNumber: true,
            min: { value: 0, message: '0 이상의 값을 입력해주세요.' },
          })}
          placeholder="최대 보유 포인트"
          type="number"
        />
      </div>
    </div>
  );
};

export default RuleInputContainer;
