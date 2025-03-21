import { useState } from 'react';
import { useForm, FieldErrors } from 'react-hook-form';
import { toast } from 'react-toastify';
import { School, SignupFormData } from '@/shared/types/signup';
import { formatSignupData } from './formatSignupData';

export const useSignupForm = () => {
  const { register, handleSubmit, setValue, watch } = useForm<SignupFormData>();
  const [selectedGender, setSelectedGender] = useState<
    'MALE' | 'FEMALE' | null
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
    if (!selectedSchool) {
      toast.error('학교를 선택해야 합니다.');
      return;
    }

    const formattedData = formatSignupData(
      data,
      selectedSchool,
      selectedGender,
    );
    console.log('전송 데이터:', JSON.stringify(formattedData, null, 2));
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
