import { UseFormRegister } from 'react-hook-form';
import { SearchIcon } from '@/shared/assets/icons';
import { StageData } from '@/shared/types/stage/create';
import Input from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';

interface Props {
  register: UseFormRegister<StageData>;
}

const InviteStudentInput = ({ register }: Props) => {
  return (
    <div className={cn('space-y-16')}>
      <div className={cn('flex', 'gap-12', 'items-center')}>
        <p className={cn('text-white', 'text-body2e')}>
          관리할 학생 (최대 5명)
        </p>
        <p className={cn('text-caption1s', 'text-gray-500')}>
          관리할 학생은 선택사항입니다.
        </p>
      </div>
      <Input
        {...register('maintainer')}
        placeholder="학생을 입력해주세요"
        icon={<SearchIcon size={24} />}
      />
    </div>
  );
};

export default InviteStudentInput;
