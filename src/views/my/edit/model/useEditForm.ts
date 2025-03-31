import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm, FieldErrors } from 'react-hook-form';
import { PatchStudentInfo } from '@/shared/types/my/edit';
import { formatEditData } from './formatEditData';
import { usePatchMyInfo } from './usePatchMyInfo';

interface UseEditFormProps {
  defaultValues?: Partial<PatchStudentInfo>;
}

export const useEditForm = ({ defaultValues }: UseEditFormProps = {}) => {
  const queryClient = useQueryClient();

  const { mutate: patchInfo } = usePatchMyInfo();
  const { register, handleSubmit, setValue, watch } = useForm<PatchStudentInfo>(
    {
      defaultValues,
    },
  );

  const [selectedSex, setSelectedSex] = useState<'MALE' | 'FEMALE' | null>(
    defaultValues?.sex || null,
  );
  const [filtered, setFiltered] = useState<boolean>(
    defaultValues?.isFiltered || false,
  );

  const { name, grade, classNumber, studentNumber, sex } = watch();

  const isDisabled = !name || !grade || !classNumber || !studentNumber || !sex;

  const onSubmit = (data: PatchStudentInfo) => {
    const formattedData = formatEditData(data, selectedSex, filtered);
    patchInfo(formattedData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['my', 'info', 'get'] });
      },
    });
    console.log('전송 데이터:', JSON.stringify(formattedData, null, 2));
  };

  const onError = (errors: FieldErrors<PatchStudentInfo>) => {
    console.log('제출에러:', errors);
  };

  return {
    register,
    handleSubmit,
    setValue,
    watch,
    selectedSex,
    setSelectedSex,
    filtered,
    setFiltered,
    isDisabled,
    onSubmit,
    onError,
  };
};
