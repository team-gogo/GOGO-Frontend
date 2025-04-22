import { AxiosError } from 'axios';
import clientInstance from '@/shared/libs/http/clientInstance';

interface Participant {
  studentId: number;
  positionX: string;
  positionY: string;
}

interface CreateTeamRequest {
  teamName: string;
  participants: Participant[];
  gameId: string;
}

export const postTeam = async (data: CreateTeamRequest) => {
  try {
    const response = await clientInstance.post(
      `/stage/team/${data.gameId}`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.error);
    }
    throw error;
  }
};
