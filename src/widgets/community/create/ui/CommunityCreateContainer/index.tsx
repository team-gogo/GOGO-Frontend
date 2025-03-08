'use client';

import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import { PageTitleBar } from '@/entities/community/create';
import { CommunityCreateFormData } from '@/shared/types/community/create';
import Button from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import TextArea from '@/shared/ui/textArea';
import { cn } from '@/shared/utils/cn';

const CommunityCreateContainer = () => {
  const { register, handleSubmit } = useForm<CommunityCreateFormData>();

  const onSubmit: SubmitHandler<CommunityCreateFormData> = (data) => {
    console.log(data);
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
        <Button type="submit">완료</Button>
      </div>
    </form>
  );
};

export default CommunityCreateContainer;
