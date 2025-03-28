import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postBuyTicket } from '../api/postBuyTicket';

export const usePostBuyTicketMutation = (shopId: string, stageId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ticketType: 'COINTOSS' | 'YAVARWEE' | 'PLINKO') =>
      postBuyTicket(ticketType, shopId),
    onSuccess: () => {
      toast.success('티켓 구매 완료되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['getMyTicket', stageId],
      });
      queryClient.invalidateQueries({
        queryKey: ['shopTicketStatus', stageId],
      });
      queryClient.invalidateQueries({
        queryKey: ['getMyPoint', stageId],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
