import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { YavarweeConfirmFormData } from '@/shared/types/mini-game/yavarwee';
import { postComfirmYavarwee } from '../api/postComfirmYavarwee';

export const useComfirmYavarweeMutation = (stageId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: YavarweeConfirmFormData) =>
      postComfirmYavarwee(stageId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getMyPoint', stageId] });
      queryClient.invalidateQueries({ queryKey: ['getMyTicket', stageId] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
