import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { PatchStudentInfo } from '@/shared/types/my/edit';
import { patchMyInfo } from '../api/patchMyInfo';

export const usePatchMyInfo = () => {
  const { push } = useRouter();
  return useMutation({
    mutationFn: (data: PatchStudentInfo) => patchMyInfo(data),
    onSuccess: () => {
      toast.success('정보 수정이 완료되었습니다.');
      push('/my');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
