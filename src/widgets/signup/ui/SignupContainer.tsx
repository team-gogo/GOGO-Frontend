'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import GenderButton from '@/entities/signup/ui/GenderButton';
import SchoolSearchResults from '@/entities/signup/ui/SchoolSearchResults';
import { SearchIcon } from '@/shared/assets/icons';
import { School, SignupFormData } from '@/shared/types/signup';
import Button from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';
import { useSchoolQuery } from '../model/useSchoolQuery';

const SignupContainer = () => {
  const { register, handleSubmit, setValue, watch } = useForm<SignupFormData>();
  const [selectedGender, setSelectedGender] = useState<
    'male' | 'female' | null
  >(null);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  const schoolName = watch('schoolName');
  const name = watch('name');
  const schoolClass = watch('schoolClass');
  const schoolNumber = watch('schoolNumber');
  const gender = watch('gender');

  const isDisabled =
    !schoolName || !name || !schoolClass || !schoolNumber || !gender;

  const { data: schools, isLoading } = useSchoolQuery(schoolName);

  register('gender', { required: '성별은 필수입니다.' });

  const handleSchoolSelect = (school: School) => {
    setSelectedSchool(school);
    setValue('schoolName', school.SCHUL_NM);
  };

  const handleGenderSelect = (gender: 'male' | 'female') => {
    setSelectedGender(gender);
    setValue('gender', gender, { shouldValidate: true });
  };

  return (
    <form
      onSubmit={handleSubmit(
        (data) => {
          console.log('제출결과 (JSON):', JSON.stringify(data, null, 2));
        },
        (errors) => {
          console.log('제출에러:', errors);
        },
      )}
      className={cn('w-full', 'max-w-[648px]', 'space-y-[72px]', 'px-16')}
    >
      <h1 className={cn('text-white', 'text-h1e', 'text-center')}>회원가입</h1>
      <div className={cn('space-y-24')}>
        <Input
          {...register('schoolName', { required: '학교 이름은 필수입니다.' })}
          placeholder="학교를 알려주세요."
          icon={<SearchIcon />}
          onChange={(e) => {
            setValue('schoolName', e.target.value);
            setSelectedSchool(null);
          }}
        />
        {schoolName && !selectedSchool && (
          <SchoolSearchResults
            schools={schools}
            isLoading={isLoading}
            onSelect={handleSchoolSelect}
          />
        )}
        <Input
          {...register('name', { required: '이름은 필수입니다.' })}
          placeholder="이름을 입력해주세요."
        />
        <div className={cn('flex', 'gap-16', 'items-center')}>
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
        <div className={cn('flex', 'gap-16', 'items-center')}>
          <GenderButton
            gender="male"
            selectedGender={selectedGender}
            onClick={handleGenderSelect}
          />
          <GenderButton
            gender="female"
            selectedGender={selectedGender}
            onClick={handleGenderSelect}
          />
        </div>
      </div>
      <Button disabled={isDisabled} type="submit">
        확인
      </Button>
    </form>
  );
};

export default SignupContainer;
