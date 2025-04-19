import axios from 'axios';
import clientInstance from '@/shared/libs/http/clientInstance';

export const getGameFormat = async (gameId: number) => {
  try {
    const response = await clientInstance.get(`/stage/game/format/${gameId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || '게임 포맷을 불러오는데 실패했습니다.',
      );
    }
    throw error;
  }
};
