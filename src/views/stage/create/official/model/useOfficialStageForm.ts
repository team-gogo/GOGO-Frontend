// hooks/useOfficialStageForm.ts

import { FieldErrors, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { handleFormErrors } from '@/shared/model/formErrorUtils';
import { OfficialStageData } from '@/shared/types/stage/create/official';

export const useOfficialStageForm = () => {
  const formMethods = useForm<OfficialStageData>({
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

  return {
    ...formMethods,
    onSubmit,
    onError,
  };
};
