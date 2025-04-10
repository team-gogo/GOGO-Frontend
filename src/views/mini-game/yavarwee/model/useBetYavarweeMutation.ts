import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { betAmountFormData } from '@/shared/types/mini-game/yavarwee';
import { postBetyavarwee } from '../api/postBetyavarwee';

export const useBetYavarweeMutation = (stageId: string) => {
  return useMutation({
    mutationFn: (data: betAmountFormData) => postBetyavarwee(stageId, data),
    onSuccess: () => {},
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
