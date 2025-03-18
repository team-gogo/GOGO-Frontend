import { UseFormRegister } from 'react-hook-form';
import { PointIcon } from '@/shared/assets/svg';
import { OfficialStageData } from '@/shared/types/stage/create/official';
import Input from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';

interface Props {
  register: UseFormRegister<OfficialStageData>;
}

const StageInputContainer = ({ register }: Props) => {
  return (
    <div className={cn('space-y-16')}>
      <p className={cn('text-white', 'text-body2e')}>스테이지</p>
      <div className={cn('flex', 'gap-24', 'tablet:flex-wrap')}>
        <Input
          {...register('stageName', {
            required: '스테이지 이름은 필수입니다.',
            maxLength: {
              value: 10,
              message: '스테이지 이름은 10자 이내로 입력해주세요.',
            },
          })}
          placeholder="이름을 입력해주세요."
        />

        <Input
          {...register('initialPoint', {
            valueAsNumber: true,
            required: '초기 보유 포인트는 필수입니다.',
            min: {
              value: 0,
              message: '초기 보유 포인트는 0 이상의 값을 입력해주세요.',
            },
          })}
          placeholder="초기 보유 포인트"
          icon={<PointIcon fill="#898989" />}
          type="number"
        />
      </div>
    </div>
  );
};

export default StageInputContainer;
