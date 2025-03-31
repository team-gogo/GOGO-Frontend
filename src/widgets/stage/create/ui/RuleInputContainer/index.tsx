import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { StageData } from '@/shared/types/stage/create';
import Input from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';

interface Props {
  register: UseFormRegister<StageData>;
  watch: UseFormWatch<StageData>;
}

const RuleInputContainer = ({ register, watch }: Props) => {
  const minBettingPoint = watch('rule.minBettingPoint');
  const maxBettingPoint = watch('rule.maxBettingPoint');

  return (
    <div className={cn('space-y-16')}>
      <p className={cn('text-white', 'text-body2e')}>규칙</p>
      <div className={cn('space-y-24')}>
        <Input
          {...register('rule.minBettingPoint', {
            required: '규칙의 최소 배팅 포인트는 필수 입력 항목입니다.',
            valueAsNumber: true,
            min: {
              value: 1000,
              message:
                '규칙의 최소 배팅 포인트는 1000 이상의 값을 입력해주세요.',
            },
            max: {
              value: 100000,
              message:
                '규칙의 최소 뱌탕 포인트는 100000 이하의 값을 입력해주세요.',
            },
            validate: (value) =>
              value <= (maxBettingPoint || 100000) ||
              '규칙의 최소 배팅 포인트는 최대 배팅 포인트보다 작거나 같아야 합니다.',
          })}
          placeholder="최소 배팅 포인트"
          type="number"
        />

        <Input
          {...register('rule.maxBettingPoint', {
            required: '규칙의 최대 배팅 포인트는 필수 입력 항목입니다.',
            valueAsNumber: true,
            min: {
              value: 1000,
              message:
                '규칙의 최대 배팅 포인트는 1000 이상의 값을 입력해주세요.',
            },
            max: {
              value: 100000,
              message:
                '규칙의 최대 배팅 포인트는 100000 이하의 값을 입력해주세요.',
            },
            validate: (value) =>
              value >= (minBettingPoint || 1000) ||
              '규칙의 최대 배팅 포인트는 최소 배팅 포인트보다 크거나 같아야 합니다.',
          })}
          placeholder="최대 배팅 포인트"
          type="number"
        />
      </div>
    </div>
  );
};

export default RuleInputContainer;
