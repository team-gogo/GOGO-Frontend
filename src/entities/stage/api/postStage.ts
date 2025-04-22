import axios from 'axios';
import clientInstance from '@/shared/libs/http/clientInstance';
import { PostStageRequest } from '@/shared/types/stage/game';

export const postStage = async (stageId: number, data: PostStageRequest) => {
  try {
    const games = data.games.map((game) => {
      if (game.system === 'SINGLE') {
        return {
          gameId: game.gameId,
          single: game.single,
        };
      } else if (game.system === 'TOURNAMENT') {
        return {
          gameId: game.gameId,
          tournament: game.tournament,
        };
      } else if (game.system === 'FULL_LEAGUE') {
        return {
          gameId: game.gameId,
          fullLeague: game.fullLeague,
        };
      }
      return game;
    });

    const requestData = {
      games,
    };

    const response = await clientInstance.post(
      `/stage/confirm/${stageId}`,
      requestData,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || '스테이지 정보 전송에 실패했습니다.',
      );
    }
    throw error;
  }
};
