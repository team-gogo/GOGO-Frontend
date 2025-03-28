import axios from 'axios';
import { MyTicketType } from '@/shared/types/mini-game';

export const getMyTicket = async (stageId: string): Promise<MyTicketType> => {
  try {
    const response = await axios.get(`/api/server/minigame/ticket/${stageId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
};
