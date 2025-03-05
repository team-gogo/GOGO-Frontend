import { UseFormRegister } from 'react-hook-form';
import { SignupFormData } from '@/shared/types/signup';
import Input from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';

interface PersonalInfoInputsProps {
  register: UseFormRegister<SignupFormData>;
}

const PersonalInfoInputs = ({ register }: PersonalInfoInputsProps) => {
  return (
    <>
      <Input
        {...register('name', { required: '이름은 필수입니다.' })}
        placeholder="이름을 입력해주세요."
      />
      <div className={cn('flex', 'gap-16', 'items-center')}>
        <Input
          type="number"
          {...register('schoolGrade', {
            required: '학년은 필수입니다.',
          })}
          placeholder="학년"
        />
        <Input
          type="number"
          {...register('schoolClass', {
            required: '반은 필수입니다.',
          })}
          placeholder="반"
        />
        <Input
          type="number"
          {...register('schoolNumber', {
            required: '번호는 필수입니다.',
          })}
          placeholder="번호"
        />
      </div>
    </>
  );
};

export default PersonalInfoInputs;
