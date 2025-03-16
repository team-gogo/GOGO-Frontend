import { UseFormRegister } from 'react-hook-form';
import { StageData } from '@/shared/types/stage/create';
import Input from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';

interface Props {
  register: UseFormRegister<StageData>;
}

const EntryNumberInput = ({ register }: Props) => {
  return (
    <div className={cn('space-y-16')}>
      <div className={cn('flex', 'gap-12', 'items-center')}>
        <p className={cn('text-white', 'text-body2e')}>입장 번호</p>
        <p className={cn('text-caption1s', 'text-gray-500')}>
          입장 번호은 선택사항입니다.
        </p>
      </div>
      <Input
        {...register('passCode', {
          required: '입장번호는 필수입니다.',
        })}
        placeholder="입장번호를 입력해주세요"
      />
    </div>
  );
};

export default EntryNumberInput;
