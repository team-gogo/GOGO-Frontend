import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postBuyTicket } from '../api/postBuyTicket';

export const usePostBuyTicketMutation = (shopId: string) => {
  return useMutation({
    mutationFn: (ticketType: 'COINTOSS' | 'TAVARWEE' | 'PLINKO') =>
      postBuyTicket(ticketType, shopId),
    onSuccess: () => {
      toast.success('티켓 구매 완료되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
