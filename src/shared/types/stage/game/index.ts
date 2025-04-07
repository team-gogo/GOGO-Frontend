interface SingleGame {
  teamAId: number;
  teamBId: number;
  startDate: string;
  endDate: string;
}

interface TournamentGame extends Omit<SingleGame, 'teamAId' | 'teamBId'> {
  teamAId?: number;
  teamBId?: number;
  round:
    | 'ROUND_OF_32'
    | 'ROUND_OF_16'
    | 'QUARTER_FINALS'
    | 'SEMI_FINALS'
    | 'FINALS';
  turn: number;
}

interface FullLeagueGame extends SingleGame {
  leagueTurn: number;
}

export interface Game {
  gameId: number;
  system: GameSystem;
  single?: SingleGame;
  tournament?: TournamentGame[];
  fullLeague?: FullLeagueGame[];
}

export interface PostStageRequest {
  games: Game[];
}

export const GameSystem = {
  TOURNAMENT: 'TOURNAMENT',
  FULL_LEAGUE: 'FULL_LEAGUE',
  SINGLE: 'SINGLE',
} as const;

export type GameSystem = (typeof GameSystem)[keyof typeof GameSystem];

export const GAME_SYSTEM_VALUES = Object.values(GameSystem);

export const isValidGameSystem = (value: string): value is GameSystem => {
  return GAME_SYSTEM_VALUES.includes(value as GameSystem);
};

export interface GameFormatData {
  format: {
    round:
      | 'ROUND_OF_32'
      | 'ROUND_OF_16'
      | 'QUARTER_FINALS'
      | 'SEMI_FINALS'
      | 'FINALS';
    match: {
      matchId: number;
      turn: number;
      ateamId: number | null;
      ateamName: string | null;
      bteamId: number | null;
      bteamName: string | null;
      isEnd: boolean;
      winTeamId: number | null;
    }[];
  }[];
}
