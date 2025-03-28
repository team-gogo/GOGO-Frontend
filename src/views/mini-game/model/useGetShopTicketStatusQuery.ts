import { useQuery } from '@tanstack/react-query';
import { ShopTicketStatusDto } from '@/shared/types/mini-game';
import minutesToMs from '@/shared/utils/minutesToms';
import { getShopTicketStatus } from '../api/getShopTicketStatus';

export const useGetShopTicketStatusQuery = (stageId: string) => {
  return useQuery<ShopTicketStatusDto, Error>({
    queryKey: ['shopTicketStatus', stageId],
    queryFn: () => getShopTicketStatus(stageId),
    staleTime: minutesToMs(5),
    gcTime: minutesToMs(5),
  });
};
