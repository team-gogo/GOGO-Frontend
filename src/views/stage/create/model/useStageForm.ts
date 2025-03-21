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
            miniGame: {
              coinToss: {
                isActive: false,
                maxBettingPoint: null,
                minBettingPoint: null,
                initialTicketCount: null,
              },
            },
            passCode: '',
            maintainer: [],
          }
        : {
            stageName: '',
            game: [],
            miniGame: {
              coinToss: {
                isActive: false,
                maxBettingPoint: null,
                minBettingPoint: null,
                initialTicketCount: null,
              },
              yavarwee: {
                isActive: false,
                maxBettingPoint: null,
                minBettingPoint: null,
                initialTicketCount: null,
              },
              plinko: {
                isActive: false,
                maxBettingPoint: null,
                minBettingPoint: null,
                initialTicketCount: null,
              },
            },
            shop: {
              coinToss: {
                isActive: false,
                price: null,
                quantity: null,
              },
              yavarwee: { isActive: false, price: null, quantity: null },
              plinko: { isActive: false, price: null, quantity: null },
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
