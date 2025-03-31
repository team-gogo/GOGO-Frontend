import { useQuery } from '@tanstack/react-query';
import { MyTicketType } from '@/shared/types/mini-game';
import { getMyTicket } from '../api/getMyTicket';

export const useGetMyTicketQuery = (stageId: string) => {
  return useQuery<MyTicketType, Error>({
    queryKey: ['getMyTicket', stageId],
    queryFn: () => getMyTicket(stageId),
  });
};
