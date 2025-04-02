import { useState } from 'react';
import { useForm, FieldErrors } from 'react-hook-form';
import { BettingFormData } from '@/shared/types/main';

export const useBettingForm = () => {
  const { register, handleSubmit, setValue, watch } =
    useForm<BettingFormData>();
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);

  const onError = (errors: FieldErrors<BettingFormData>) => {
    console.log('제출에러:', errors);
  };

  return {
    register,
    handleSubmit,
    setValue,
    watch,
    selectedTeamId,
    setSelectedTeamId,
    onError,
  };
};
