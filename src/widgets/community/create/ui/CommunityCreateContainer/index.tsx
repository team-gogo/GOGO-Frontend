'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import {
  useForm,
  SubmitHandler,
  FieldErrors,
  FormProvider,
} from 'react-hook-form';
import { toast } from 'react-toastify';
import { CategoryContainer, PageTitleBar } from '@/entities/community/create';
import { handleFormErrors } from '@/shared/model/formErrorUtils';
import { SportType } from '@/shared/model/sportTypes';
import { CommunityCreateFormData } from '@/shared/types/community/create';
import Button from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import TextArea from '@/shared/ui/textArea';
import { cn } from '@/shared/utils/cn';
import { useCreateCommunityMutation } from '../../model/useCreateCommunityMutation';

const CommunityCreateContainer = () => {
  const [selectedSport, setSelectedSport] = useState<SportType | null>(null);
  const params = useParams<{ stageId: string }>();
  const { stageId } = params;
  const {
    mutate: createCommunity,
    isPending,
    isSuccess,
  } = useCreateCommunityMutation(stageId);

  const toggleSportSelection = (sport: SportType) => {
    setSelectedSport((prev) => (prev === sport ? null : sport));
  };

  const methods = useForm<CommunityCreateFormData>();
  const { handleSubmit, register, setValue } = methods;

  const handleImageUpload = (file: File) => {
    setValue('image', file);
  };

  const onSubmit: SubmitHandler<CommunityCreateFormData> = (data) => {
    createCommunity(data);
  };

  const onError = (errors: FieldErrors<CommunityCreateFormData>) => {
    handleFormErrors(errors, toast.error);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className={cn('w-full', 'max-w-[1320px]', 'space-y-[72px]')}
      >
        <PageTitleBar />
        <div className={cn('space-y-[36px]')}>
          <CategoryContainer
            register={register}
            setValue={setValue}
            selectedSport={selectedSport}
            toggleSportSelection={toggleSportSelection}
            stageId={stageId}
          />

          <div className={cn('space-y-[397px]')}>
            <div className={cn('space-y-[32px]')}>
              <Input
                isImageUpload
                placeholder="클릭하여 이미지 업로드"
                onImageUpload={handleImageUpload}
              />
              <Input
                placeholder="제목을 입력해주세요."
                maxLength={30}
                {...register('title', { required: '제목을 입력해주세요.' })}
              />
              <TextArea
                placeholder="내용을 입력해주세요."
                maxLength={1000}
                rows={1}
                {...register('content', { required: '내용을 입력해주세요.' })}
              />
            </div>
            <Button disabled={isPending || isSuccess} type="submit">
              완료
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CommunityCreateContainer;
