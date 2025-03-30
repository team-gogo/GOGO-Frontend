import { useState } from 'react';
import { useForm, FieldErrors } from 'react-hook-form';
import { PlinkoFormType } from '@/shared/types/mini-game';

export const usePlinkoForm = () => {
  const { register, handleSubmit, setValue, watch } = useForm<PlinkoFormType>({
    defaultValues: {
      risk: 'LOW',
    },
  });
  const [selectedRisk, setSelectedRisk] = useState<'LOW' | 'MEDIUM' | 'HIGH'>(
    'LOW',
  );
  const amount = watch('amount');
  const risk = watch('risk');

  const isDisabled = !amount || !risk;

  const onError = (errors: FieldErrors<PlinkoFormType>) => {
    console.log('제출에러:', errors);
  };

  return {
    register,
    handleSubmit,
    setValue,
    watch,
    selectedRisk,
    setSelectedRisk,
    isDisabled,
    onError,
  };
};
