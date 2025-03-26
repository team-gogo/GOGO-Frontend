import { useQuery } from '@tanstack/react-query';
import { MyTicketType } from '@/shared/types/mini-game';
import { getTicketCount } from '../api/getTicketCount';

export const useGetTicketCountQuery = (stageId: string) => {
  return useQuery<MyTicketType, Error>({
    queryKey: ['ticketCount', stageId],
    queryFn: () => getTicketCount(stageId),
  });
};
