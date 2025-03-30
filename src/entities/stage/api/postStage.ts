import axios from 'axios';

interface SingleGame {
  teamAId: number;
  teamBId: number;
  startDate: string;
  endDate: string;
}

interface TournamentGame {
  teamAId?: number;
  teamBId?: number;
  round:
    | 'ROUND_OF_32'
    | 'ROUND_OF_16'
    | 'QUARTER_FINALS'
    | 'SEMI_FINALS'
    | 'FINALS';
  turn: number;
  startDate: string;
  endDate: string;
}

interface FullLeagueGame {
  teamAId: number;
  teamBId: number;
  leagueTurn: number;
  startDate: string;
  endDate: string;
}

interface Game {
  gameId: number;
  single?: SingleGame;
  tournament?: TournamentGame[];
  fullLeague?: FullLeagueGame[];
}

interface PostStageRequest {
  games: Game[];
}

export const postStage = async (
  stageId: number,
  data: PostStageRequest,
  system: string,
) => {
  try {
    const games = data.games.map((game) => {
      if (system === 'single') {
        return {
          gameId: game.gameId,
          single: game.single,
        };
      } else if (system === 'tournament') {
        return {
          gameId: game.gameId,
          tournament: game.tournament,
        };
      } else if (system === 'fullLeague') {
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

    const response = await axios.post(
      `/api/server/stage/confirm/${stageId}`,
      requestData,
      {
        headers: {
          Authorization: localStorage.getItem('token') || '',
          'Content-Type': 'application/json',
        },
      },
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
