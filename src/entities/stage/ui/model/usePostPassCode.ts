import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { PassCodeType } from '@/shared/types/stage';
import { postPassCode } from '../api/postPassCode';

export const usePostPassCode = (stageId: number) => {
  const { push } = useRouter();
  return useMutation({
    mutationFn: (data?: PassCodeType) => postPassCode(stageId, data),
    onSuccess: () => {
      toast.success('스테이지 참여가 완료되었습니다.');
      push(`/stage/stageId=${stageId}`);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
