import axios from 'axios';
import clientInstance from '@/shared/libs/http/clientInstance';
import { MyTicketType } from '@/shared/types/mini-game';

export const getMyTicket = async (stageId: string): Promise<MyTicketType> => {
  try {
    const response = await clientInstance.get(`/minigame/ticket/${stageId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
};
