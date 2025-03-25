'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import { CategoryContainer, PageTitleBar } from '@/entities/community/create';
import { SportType } from '@/shared/model/sportTypes';
import { CommunityCreateFormData } from '@/shared/types/community/create';
import Button from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import TextArea from '@/shared/ui/textArea';
import { cn } from '@/shared/utils/cn';
import { useCreateCommunityMutation } from '../../model/useCreateCommunityMutation';

const CommunityCreateContainer = () => {
  const [selectedSport, setSelectedSport] = useState<SportType | null>(null);
  const { stageId } = useParams();
  const safeStageId = Array.isArray(stageId) ? stageId[0] : stageId || '';
  const {
    mutate: createCommunity,
    isPending,
    isSuccess,
  } = useCreateCommunityMutation(safeStageId);

  const toggleSportSelection = (sport: SportType) => {
    setSelectedSport((prev) => (prev === sport ? null : sport));
  };

  const { register, handleSubmit, setValue } =
    useForm<CommunityCreateFormData>();

  const onSubmit: SubmitHandler<CommunityCreateFormData> = (data) => {
    console.log(data);
    createCommunity(data);
  };

  const onError = (errors: FieldErrors<CommunityCreateFormData>) => {
    console.error('Form errors:', errors);
  };

  return (
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
          stageId={safeStageId}
        />
        <div className={cn('space-y-[397px]')}>
          <div className={cn('space-y-[32px]')}>
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
  );
};

export default CommunityCreateContainer;
