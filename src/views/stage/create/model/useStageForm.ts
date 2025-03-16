import { useForm, FieldErrors } from 'react-hook-form';
import { toast } from 'react-toastify';
import { handleFormErrors } from '@/shared/model/formErrorUtils';
import { StageData } from '@/shared/types/stage/create';

export const useStageForm = (formType: 'fast' | 'official') => {
  const formMethods = useForm<StageData>({
    defaultValues:
      formType === 'fast'
        ? {
            stageName: '',
            game: [],
            miniGame: { coinToss: { isActive: false } },
            passCode: '',
            maintainer: [],
          }
        : {
            stageName: '',
            game: [],
            miniGame: {
              coinToss: { isActive: false },
              yavarwee: { isActive: false },
              plinko: { isActive: false },
            },
            shop: {
              coinToss: { isActive: false },
              yavarwee: { isActive: false },
              plinko: { isActive: false },
            },
            passCode: '',
            maintainer: [],
          },
  });

  const { handleSubmit, register, watch, setValue, control } = formMethods;

  const onSubmit = (data: StageData) => {
    if (data.game.length === 0) {
      toast.error('경기는 한 개 이상 생성되어야 합니다.');
      return;
    }
    console.log('폼 제출 데이터:', data);
  };

  const onError = (errors: FieldErrors<StageData>) => {
    handleFormErrors(errors, toast.error);
  };

  return {
    handleSubmit,
    register,
    watch,
    setValue,
    control,
    onSubmit,
    onError,
  };
};
