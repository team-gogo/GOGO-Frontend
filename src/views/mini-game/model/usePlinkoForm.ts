import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useForm, FieldErrors } from 'react-hook-form';
import { PlinkoFormType, PlinkoResponse } from '@/shared/types/mini-game';
import { formatPlinkoData } from './formatPlinkoData';
import { usePostPlinkoGame } from './usePostPlinkoGame';

export const usePlinkoForm = () => {
  const pathname = usePathname();

  const match = pathname.match(/\/mini-game\/([^/]+)\/plinko/);
  const stageId = match ? match[1] : null;

  const { mutate: PostPlinko } = usePostPlinkoGame(Number(stageId));

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

  const onSubmit = (data: PlinkoFormType) => {
    const formattedData = formatPlinkoData(data, selectedRisk);
    PostPlinko(formattedData, {
      onSuccess: (response: PlinkoResponse) => {
        console.log('게임 결과:', response);
      },
      onError: () => {
        console.error('게임 요청 실패');
      },
    });
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
