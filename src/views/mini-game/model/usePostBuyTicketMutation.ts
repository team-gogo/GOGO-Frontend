import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { postBuyTicket } from '../api/postBuyTicket';

type TicketType = 'COINTOSS' | 'YAVARWEE' | 'PLINKO';

export const usePostBuyTicketMutation = (shopId: string, stageId: string) => {
  const queryClient = useQueryClient();
  const [pendingTypes, setPendingTypes] = useState<Record<TicketType, boolean>>(
    {
      COINTOSS: false,
      YAVARWEE: false,
      PLINKO: false,
    },
  );

  const mutation = useMutation({
    mutationFn: async (ticketType: TicketType) => {
      setPendingTypes((prev) => ({ ...prev, [ticketType]: true }));
      await postBuyTicket(ticketType, shopId);
    },
    onSuccess: (_, ticketType) => {
      toast.success('티켓 구매 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['getMyTicket', stageId] });
      queryClient.invalidateQueries({
        queryKey: ['shopTicketStatus', stageId],
      });
      queryClient.invalidateQueries({ queryKey: ['getMyPoint', stageId] });
      setPendingTypes((prev) => ({ ...prev, [ticketType]: false }));
    },
    onError: (error: Error, ticketType) => {
      toast.error(error.message);
      setPendingTypes((prev) => ({ ...prev, [ticketType]: false }));
    },
  });

  return {
    buyTicket: mutation.mutate,
    isPending: (ticketType: TicketType) => pendingTypes[ticketType],
  };
};
