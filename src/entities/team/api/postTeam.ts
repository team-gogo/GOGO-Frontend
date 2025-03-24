import instance from '@/shared/api/instance';

interface Participant {
  studentId: number;
  positionX: string;
  positionY: string;
}

interface CreateTeamRequest {
  teamName: string;
  participants: Participant[];
  matchId: string;
}

export const postTeam = async (data: CreateTeamRequest) => {
  try {
    const response = await instance.post(`/team/${data.matchId}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
