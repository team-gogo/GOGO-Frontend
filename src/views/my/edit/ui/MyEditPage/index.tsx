'use client';

import { useEffect } from 'react';
import BackPageButton from '@/shared/ui/backPageButton';
import Button from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';
import { useEditForm } from '@/views/my/edit/model/useEditForm';
import { FilterSelect, InputWrapper, SexSelect } from '@/widgets/my/edit';
import getMockStudentInfo from '../../Mock/getMyInfo';

const MyEditPage = () => {
  const myInfoMock = getMockStudentInfo();

  const { name, grade, classNumber, studentNumber, sex, isFiltered } =
    myInfoMock;

  const {
    register,
    handleSubmit,
    isDisabled,
    onSubmit,
    onError,
    setValue,
    watch,
    filtered,
    setFiltered,
    selectedSex,
    setSelectedSex,
  } = useEditForm();

  useEffect(() => {
    setValue('name', name);
    setValue('grade', grade);
    setValue('classNumber', classNumber);
    setValue('studentNumber', studentNumber);
    setValue('sex', sex);
    setValue('isFiltered', isFiltered);
  }, []);

  return (
    <div
      className={cn(
        'flex',
        'w-full',
        'h-full',
        'flex-col',
        'items-center',
        'justify-center',
        'py-[2rem]',
        'px-[1rem]',
      )}
    >
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className={cn(
          'flex',
          'flex-col',
          'w-full',
          'h-full',
          'max-w-[82.5rem]',
          'justify-between',
        )}
      >
        <div className={cn('flex', 'flex-col', 'w-full', 'gap-[3rem]')}>
          <BackPageButton label="정보 수정" path="/my" />
          <div className={cn('flex', 'flex-col', 'w-full', 'gap-[2.5rem]')}>
            <div
              className={cn('flex', 'items-center', 'w-full', 'gap-[1.5rem]')}
            >
              <InputWrapper title="이름">
                <Input
                  placeholder="김진원"
                  {...register('name', { required: true })}
                />
              </InputWrapper>
              <InputWrapper title="학년">
                <Input
                  placeholder="3학년"
                  {...register('grade', { required: true })}
                />
              </InputWrapper>
            </div>

            <div
              className={cn('flex', 'items-center', 'w-full', 'gap-[1.5rem]')}
            >
              <InputWrapper title="반">
                <Input
                  placeholder="4반"
                  {...register('classNumber', { required: true })}
                />
              </InputWrapper>
              <InputWrapper title="번호">
                <Input
                  placeholder="5번"
                  {...register('studentNumber', { required: true })}
                />
              </InputWrapper>
            </div>

            <div
              className={cn('flex', 'items-center', 'w-full', 'gap-[1.5rem]')}
            >
              <InputWrapper title="성별">
                <SexSelect
                  register={register}
                  selectedSex={selectedSex}
                  setSelectedSex={setSelectedSex}
                  setValue={setValue}
                  watch={watch}
                />
              </InputWrapper>
              <FilterSelect
                filtered={filtered}
                setFiltered={setFiltered}
                setValue={setValue}
                watch={watch}
              />
            </div>
          </div>
        </div>
        <Button disabled={isDisabled} type="submit">
          수정하기
        </Button>
      </form>
    </div>
  );
};

export default MyEditPage;
