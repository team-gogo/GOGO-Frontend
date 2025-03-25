type MatchCategory =
  | 'SOCCER'
  | 'BASKET_BALL'
  | 'BASE_BALL'
  | 'VOLLEY_BALL'
  | 'BADMINTON'
  | 'LOL'
  | 'ETC';

type SystemCategory = 'TOURNAMENT' | 'FULL_LEAGUE' | 'SINGLE';

export interface MatchGameType {
  gameId: number;
  gameName: string;
  teamCount: number;
  category: MatchCategory;
  system: SystemCategory;
  isParticipating: boolean;
}

export interface MatchGamesResponse {
  games: MatchGameType[];
}
