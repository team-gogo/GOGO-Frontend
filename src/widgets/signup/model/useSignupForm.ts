import { useState } from 'react';
import { useForm, FieldErrors } from 'react-hook-form';
import { School, SignupFormData } from '@/shared/types/signup';

export const useSignupForm = () => {
  const { register, handleSubmit, setValue, watch } = useForm<SignupFormData>();
  const [selectedGender, setSelectedGender] = useState<
    'male' | 'female' | null
  >(null);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  const schoolGrade = watch('schoolGrade');
  const schoolName = watch('schoolName');
  const name = watch('name');
  const schoolClass = watch('schoolClass');
  const schoolNumber = watch('schoolNumber');
  const gender = watch('gender');

  const isDisabled =
    !schoolGrade ||
    !schoolName ||
    !name ||
    !schoolClass ||
    !schoolNumber ||
    !gender;

  const onSubmit = (data: SignupFormData) => {
    console.log('제출결과 (JSON):', JSON.stringify(data, null, 2));
  };

  const onError = (errors: FieldErrors<SignupFormData>) => {
    console.log('제출에러:', errors);
  };

  return {
    register,
    handleSubmit,
    setValue,
    watch,
    selectedGender,
    setSelectedGender,
    selectedSchool,
    setSelectedSchool,
    isDisabled,
    onSubmit,
    onError,
  };
};
