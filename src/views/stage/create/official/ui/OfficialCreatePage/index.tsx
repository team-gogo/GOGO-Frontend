'use client';

import { FieldErrors, useForm } from 'react-hook-form';
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
  const { register, handleSubmit, watch, setValue } =
    useForm<OfficialStageData>({
      defaultValues: {
        miniGame: {
          yavarwee: { isActive: false },
          coinToss: { isActive: false },
          plinko: { isActive: false },
        },
      },
    });

  const onSubmit = (data: OfficialStageData) => {
    console.log('폼 제출 데이터:', data);
  };

  const onError = (errors: FieldErrors<OfficialStageData>) => {
    console.error('폼 제출 에러:', errors);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className={cn('w-full', 'max-w-[1320px]', 'space-y-[3rem]')}
    >
      <BackPageButton type="back" label="스테이지 생성 (학교 공식 행사)" />
      <StageInputContainer register={register} />
      <MatchSettingContainer />
      <RuleInputContainer register={register} />
      <MiniGameContainer
        register={register}
        watch={watch}
        setValue={setValue}
      />
      <StoreContainer register={register} />
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
