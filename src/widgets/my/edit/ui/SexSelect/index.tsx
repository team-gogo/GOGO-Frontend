import { useEffect } from 'react';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { PatchStudentInfo } from '@/shared/types/my/edit';
import Button from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';

interface SexSelectProps {
  register: UseFormRegister<PatchStudentInfo>;
  selectedSex: 'MALE' | 'FEMALE' | null;
  setSelectedSex: (sex: 'MALE' | 'FEMALE' | null) => void;
  setValue: UseFormSetValue<PatchStudentInfo>;
  watch: UseFormWatch<PatchStudentInfo>;
}

const SEX_OPTIONS: { label: string; value: 'MALE' | 'FEMALE' }[] = [
  { label: '남성', value: 'MALE' },
  { label: '여성', value: 'FEMALE' },
];

const SexSelect = ({
  register,
  selectedSex,
  setSelectedSex,
  setValue,
  watch,
}: SexSelectProps) => {
  useEffect(() => {
    const sex = watch('sex');
    setSelectedSex(sex);
    setValue('sex', sex, { shouldValidate: true });
  }, []);

  register('sex', { required: '성별은 필수입니다.' });

  const handleSexSelect = (sex: 'MALE' | 'FEMALE') => {
    setSelectedSex(sex);
    setValue('sex', sex, { shouldValidate: true });
  };

  return (
    <div className={cn('w-full', 'flex', 'items-center', 'gap-[1.5rem]')}>
      {SEX_OPTIONS.map(({ label, value }) => (
        <Button
          key={value}
          bg={selectedSex === value ? 'bg-main-500' : 'bg-gray-700'}
          onClick={() => handleSexSelect(value)}
          textColor={selectedSex !== value ? 'text-gray-400' : undefined}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

export default SexSelect;
