import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { StageData } from '@/shared/types/stage/create';
import { postOfficialStage } from '../api/postOfficialStage';

export const useOfficialStage = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: StageData) => postOfficialStage(data),
    onSuccess: () => {
      toast.success('공식 경기 등록이 완료되었습니다.');
      router.push('/stage');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
