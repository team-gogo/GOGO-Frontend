'use client';

import GenderSelection from '@/entities/signup/ui/GenderSelection';
import PersonalInfoInputs from '@/entities/signup/ui/PersonalInfoInputs';
import SchoolInput from '@/entities/signup/ui/SchoolInput.tsx';
import Button from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';
import { useSignupForm } from '../model/useSignupForm';

const SignupContainer = () => {
  const {
    register,
    handleSubmit,
    isDisabled,
    onSubmit,
    onError,
    setValue,
    watch,
    selectedSchool,
    setSelectedSchool,
    selectedGender,
    setSelectedGender,
  } = useSignupForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className={cn('w-full', 'max-w-[648px]', 'space-y-[72px]', 'px-16')}
    >
      <h1 className={cn('text-white', 'text-h1e', 'text-center')}>회원가입</h1>
      <div className={cn('space-y-24')}>
        <SchoolInput
          register={register}
          setValue={setValue}
          watch={watch}
          selectedSchool={selectedSchool}
          setSelectedSchool={setSelectedSchool}
        />
        <PersonalInfoInputs register={register} />
        <GenderSelection
          register={register}
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
          setValue={setValue}
        />
      </div>
      <Button disabled={isDisabled} type="submit">
        확인
      </Button>
    </form>
  );
};

export default SignupContainer;
