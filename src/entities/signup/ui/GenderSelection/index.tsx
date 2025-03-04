import React from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import GenderButton from '@/entities/signup/ui/GenderButton';
import { SignupFormData } from '@/shared/types/signup';
import { cn } from '@/shared/utils/cn';

interface GenderSelectionProps {
  register: UseFormRegister<SignupFormData>;
  selectedGender: 'male' | 'female' | null;
  setSelectedGender: (gender: 'male' | 'female' | null) => void;
  setValue: UseFormSetValue<SignupFormData>;
}

const GenderSelection = ({
  register,
  selectedGender,
  setSelectedGender,
  setValue,
}: GenderSelectionProps) => {
  register('gender', { required: '성별은 필수입니다.' });

  const handleGenderSelect = (gender: 'male' | 'female') => {
    setSelectedGender(gender);
    setValue('gender', gender, { shouldValidate: true });
  };

  return (
    <div className={cn('flex', 'gap-16', 'items-center')}>
      <GenderButton
        gender="male"
        selectedGender={selectedGender}
        onClick={() => handleGenderSelect('male')}
      />
      <GenderButton
        gender="female"
        selectedGender={selectedGender}
        onClick={() => handleGenderSelect('female')}
      />
    </div>
  );
};

export default GenderSelection;
