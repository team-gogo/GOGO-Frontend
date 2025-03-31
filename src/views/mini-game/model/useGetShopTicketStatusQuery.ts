import { useQuery } from '@tanstack/react-query';
import { ShopTicketStatusDto } from '@/shared/types/mini-game';
import { getShopTicketStatus } from '../api/getShopTicketStatus';

export const useGetShopTicketStatusQuery = (stageId: string) => {
  return useQuery<ShopTicketStatusDto, Error>({
    queryKey: ['shopTicketStatus', stageId],
    queryFn: () => getShopTicketStatus(stageId),
  });
};
