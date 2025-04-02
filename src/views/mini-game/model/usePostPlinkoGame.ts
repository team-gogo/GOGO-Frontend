import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { usePointTicketStore } from '@/shared/stores';
import { PlinkoFormType } from '@/shared/types/mini-game';
import { postPlinkoGame } from '../api/postPlinkoGame';

export const usePostPlinkoGame = (stageId: number, amount: number) => {
  const { point, setPoint, ticket, setTicket } = usePointTicketStore();
  return useMutation({
    mutationFn: (data: PlinkoFormType) => postPlinkoGame(stageId, data),
    onSuccess: () => {
      const updatedPoint = point - amount;
      setPoint(updatedPoint);
      setTicket(ticket - 1);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
