'use client';

import BackPageButton from '@/shared/ui/backPageButton';
import Button from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';
import {
  EntryNumberInput,
  InviteStudentInput,
  MatchSettingContainer,
  MiniGameContainer,
  RuleInputContainer,
  StageInputContainer,
} from '@/widgets/stage/create';
import { useStageForm } from '../../../model/useStageForm';

const FastCreatePage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    onSubmit,
    onError,
    isPending,
    isSuccess,
  } = useStageForm('fast');

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className={cn('w-full', 'max-w-[1320px]', 'space-y-[3rem]')}
    >
      <BackPageButton type="back" label="스테이지 생성 (빠른 경기)" />
      <StageInputContainer register={register} />
      <MatchSettingContainer
        control={control}
        register={register}
        watch={watch}
        mode="fast"
      />
      <RuleInputContainer register={register} watch={watch} />
      <MiniGameContainer
        register={register}
        watch={watch}
        setValue={setValue}
        isFastMode={true}
      />
      <div className={cn('flex', 'w-full', 'gap-24', 'tablet:flex-wrap')}>
        <div className="w-full">
          <EntryNumberInput register={register} />
        </div>
        <div className="w-full">
          <InviteStudentInput register={register} setValue={setValue} />
        </div>
      </div>
      <Button disabled={isPending || isSuccess} type="submit">
        확인
      </Button>
    </form>
  );
};

export default FastCreatePage;
