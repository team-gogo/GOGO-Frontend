import { useQuery } from '@tanstack/react-query';
import { MyTicketType } from '@/shared/types/mini-game';
import minutesToMs from '@/shared/utils/minutesToms';
import { getMyTicket } from '../api/getMyTicket';

export const useGetMyTicketQuery = (stageId: string) => {
  return useQuery<MyTicketType, Error>({
    queryKey: ['getMyTicket', stageId],
    queryFn: () => getMyTicket(stageId),
    staleTime: minutesToMs(5),
    gcTime: minutesToMs(5),
  });
};
