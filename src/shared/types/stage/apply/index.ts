type MatchCategory =
  | 'SOCCER'
  | 'BASKET_BALL'
  | 'BASE_BALL'
  | 'VOLLEY_BALL'
  | 'BADMINTON'
  | 'LOL'
  | 'ETC';

export interface MatchGameType {
  gameId: number;
  gameName: string;
  teamCount: number;
  category: MatchCategory[];
}

export interface MatchGamesResponse {
  games: MatchGameType[];
}
