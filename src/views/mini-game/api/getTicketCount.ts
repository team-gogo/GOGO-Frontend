import axios from 'axios';
import { MyTicketType } from '@/shared/types/mini-game';

export const getTicketCount = async (
  stageId: string,
): Promise<MyTicketType> => {
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
