import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import GenderButton from '@/entities/signup/ui/GenderButton';
import { SignupFormData } from '@/shared/types/signup';
import { cn } from '@/shared/utils/cn';

interface GenderSelectionProps {
  register: UseFormRegister<SignupFormData>;
  selectedGender: 'MALE' | 'FEMALE' | null;
  setSelectedGender: (gender: 'MALE' | 'FEMALE' | null) => void;
  setValue: UseFormSetValue<SignupFormData>;
}

const GenderSelection = ({
  register,
  selectedGender,
  setSelectedGender,
  setValue,
}: GenderSelectionProps) => {
  register('gender', { required: '성별은 필수입니다.' });

  const handleGenderSelect = (gender: 'MALE' | 'FEMALE') => {
    setSelectedGender(gender);
    setValue('gender', gender, { shouldValidate: true });
  };

  return (
    <div className={cn('flex', 'gap-16', 'items-center')}>
      <GenderButton
        gender="MALE"
        selectedGender={selectedGender}
        onClick={() => handleGenderSelect('MALE')}
      />
      <GenderButton
        gender="FEMALE"
        selectedGender={selectedGender}
        onClick={() => handleGenderSelect('FEMALE')}
      />
    </div>
  );
};

export default GenderSelection;
