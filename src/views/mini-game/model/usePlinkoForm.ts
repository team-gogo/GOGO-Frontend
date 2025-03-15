import { useState } from 'react';
import { useForm, FieldErrors } from 'react-hook-form';
import { PlinkoFormType } from '@/shared/types/mini-game';
import { formatPlinkoData } from './formatPlinkoData';

export const usePlinkoForm = () => {
  const { register, handleSubmit, setValue, watch } = useForm<PlinkoFormType>();
  const [selectedRisk, setSelectedRisk] = useState<'LOW' | 'MEDIUM' | 'HIGH'>(
    'LOW',
  );
  const amount = watch('amount');
  const times = watch('times');
  const risk = watch('risk');

  const isDisabled = !amount || !times || !risk;

  const onSubmit = (data: PlinkoFormType) => {
    const formattedData = formatPlinkoData(data, selectedRisk);
    console.log('전송 데이터:', JSON.stringify(formattedData, null, 2));
  };

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
    onSubmit,
    onError,
  };
};
