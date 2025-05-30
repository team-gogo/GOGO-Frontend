export interface BettingFormData {
  predictedWinTeamId: number;
  bettingPoint: number;
}

type Category =
  | 'SOCCER'
  | 'BASKET_BALL'
  | 'BASE_BALL'
  | 'VOLLEY_BALL'
  | 'BADMINTON'
  // | 'LOL'
  | 'ETC';
type System = 'TOURNAMENT' | 'FULL_LEAGUE' | 'SINGLE';

export interface Game {
  gameId: number;
  gameName: string;
  teamCount: number;
  category: Category;
  system: System;
  teamMinCapacity: number;
  teamMaxCapacity: number;
}

export interface StageInMatchResponse {
  count: number;
  games: Game[];
}

export interface MyPointType {
  point: number;
}

export interface BatchMatchType {
  winTeamId: number;
  aTeamScore: number;
  bTeamScore: number;
}

export interface MatchNoticeType {
  isNotice: boolean;
}
