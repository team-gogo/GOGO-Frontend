import axios from 'axios';
import { ShopTicketStatusDto } from '@/shared/types/mini-game';

export const getShopTicketStatus = async (
  stageId: string,
): Promise<ShopTicketStatusDto> => {
  try {
    const response = await axios.get(`/api/server/shop/${stageId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
};
