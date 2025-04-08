'use client';

import { useEffect } from 'react';
import BackPageButton from '@/shared/ui/backPageButton';
import Button from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';
import { useEditForm } from '@/views/my/edit/model/useEditForm';
import { useGetMyInfo } from '@/views/my/model/useGetMyInfo';
import { FilterSelect, InputWrapper, SexSelect } from '@/widgets/my/edit';

const MyEditPage = () => {
  const { data: myInfo } = useGetMyInfo();

  const { name, grade, classNumber, studentNumber, sex, isFiltered } =
    myInfo || {};

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
  } = useEditForm({
    defaultValues: {
      name: '',
    },
  });

  useEffect(() => {
    if (myInfo) {
      setValue('name', name || '');
      setValue('grade', grade || 0);
      setValue('classNumber', classNumber || 0);
      setValue('studentNumber', studentNumber || 0);
      setValue('sex', sex || 'MALE');
      setSelectedSex(sex || null);
      setValue('isFiltered', isFiltered || false);
      setFiltered(isFiltered || false);
    }
  }, [myInfo]);

  return (
    <div
      className={cn(
        'flex',
        'w-full',
        'pad:h-[calc(100vh-120px)]',
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
          <div
            className={cn(
              'flex',
              'flex-col',
              'w-full',
              'pad:gap-[2.5rem]',
              'gap-[1.5rem]',
            )}
          >
            <div
              className={cn(
                'flex',
                'pad:flex-row',
                'flex-col',
                'items-center',
                'w-full',
                'gap-[1.5rem]',
              )}
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
              className={cn(
                'flex',
                'pad:flex-row',
                'flex-col',
                'items-center',
                'w-full',
                'gap-[1.5rem]',
              )}
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
              className={cn(
                'flex',
                'pad:flex-row',
                'flex-col',
                'items-center',
                'w-full',
                'gap-[1.5rem]',
              )}
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
        <div className={cn('pt-[5rem]')}>
          <Button disabled={isDisabled} type="submit">
            수정하기
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MyEditPage;
