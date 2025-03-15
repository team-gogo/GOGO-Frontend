'use client';

import { FieldErrors, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { handleFormErrors } from '@/shared/model/formErrorUtils';
import { OfficialStageData } from '@/shared/types/stage/create/official';
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
} from '@/widgets/stage/create/official';

const OfficialCreatePage = () => {
  const { register, handleSubmit, watch, setValue, control } =
    useForm<OfficialStageData>({
      defaultValues: {
        game: [],
        miniGame: {
          yavarwee: { isActive: false },
          coinToss: { isActive: false },
          plinko: { isActive: false },
        },
        shop: {
          yavarwee: { isActive: false },
          coinToss: { isActive: false },
          plinko: { isActive: false },
        },
      },
    });

  const onSubmit = (data: OfficialStageData) => {
    if (data.game.length === 0) {
      toast.error('경기는 한 개 이상 생성되어야 합니다.');
      return;
    }
    console.log('폼 제출 데이터:', data);
  };

  const onError = (errors: FieldErrors<OfficialStageData>) => {
    handleFormErrors(errors, toast.error);
  };

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
      />
      <RuleInputContainer register={register} watch={watch} />
      <MiniGameContainer
        register={register}
        watch={watch}
        setValue={setValue}
      />
      <StoreContainer register={register} watch={watch} setValue={setValue} />
      <div className={cn('flex', 'w-full', 'gap-24', 'tablet:flex-wrap')}>
        <div className="w-full">
          <EntryNumberInput register={register} />
        </div>
        <div className="w-full">
          <InviteStudentInput register={register} />
        </div>
      </div>
      <Button type="submit">확인</Button>
    </form>
  );
};

export default OfficialCreatePage;
