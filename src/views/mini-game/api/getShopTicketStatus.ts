import axios from 'axios';
import clientInstance from '@/shared/api/clientInstance';
import { ShopTicketStatusDto } from '@/shared/types/mini-game';

export const getShopTicketStatus = async (
  stageId: string,
): Promise<ShopTicketStatusDto> => {
  try {
    const response = await clientInstance.get(`/shop/${stageId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
};
