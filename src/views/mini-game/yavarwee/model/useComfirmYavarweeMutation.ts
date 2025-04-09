import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { YavarweeConfirmFormData } from '@/shared/types/mini-game/yavarwee';
import { postComfirmYavarwee } from '../api/postComfirmYavarwee';

export const useComfirmYavarweeMutation = (stageId: string) => {
  return useMutation({
    mutationFn: (data: YavarweeConfirmFormData) =>
      postComfirmYavarwee(stageId, data),
    onSuccess: () => {},
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
