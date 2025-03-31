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

export type { Game, PostStageRequest };
