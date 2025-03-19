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
  StoreContainer,
} from '@/widgets/stage/create';
import { useStageForm } from '../../../model/useStageForm';

const OfficialCreatePage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    onSubmit,
    onError,
  } = useStageForm('official');

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className={cn('w-full', 'max-w-[1320px]', 'space-y-[3rem]')}
    >
      <BackPageButton type="back" label="스테이지 생성 (학교 공식 행사)" />
      <StageInputContainer register={register} />
      <MatchSettingContainer
        control={control}
        register={register}
        watch={watch}
        mode="official"
      />
      <RuleInputContainer register={register} watch={watch} />
      <MiniGameContainer
        register={register}
        watch={watch}
        setValue={setValue}
        isFastMode={false}
      />
      <StoreContainer register={register} watch={watch} setValue={setValue} />
      <div className={cn('flex', 'w-full', 'gap-24', 'tablet:flex-wrap')}>
        <div className="w-full">
          <EntryNumberInput register={register} />
        </div>
        <div className="w-full">
          <InviteStudentInput register={register} setValue={setValue} />
        </div>
      </div>
      <Button type="submit">확인</Button>
    </form>
  );
};

export default OfficialCreatePage;
