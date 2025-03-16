export type GameCategory =
  | 'SOCCER'
  | 'BASKET_BALL'
  | 'BASE_BALL'
  | 'VOLLEY_BALL'
  | 'BADMINTON'
  | 'LOL'
  | 'ETC';

export type GameSystem = 'TOURNAMENT' | 'FULL_LEAGUE' | 'SINGLE';

export interface Game {
  category: GameCategory;
  name: string;
  system: GameSystem;
  teamMinCapacity: number | null;
  teamMaxCapacity: number | null;
}

export interface MiniGame {
  isActive: boolean;
  maxBettingPoint?: number | null;
  minBettingPoint?: number | null;
  initialTicketCount?: number | null;
}

export interface ShopItem {
  isActive: boolean;
  price?: number | null;
  quantity?: number | null;
}

export interface StageData {
  stageName: string;
  game: Game[];
  initialPoint: number;
  rule: {
    maxBettingPoint: number;
    minBettingPoint: number;
  };
  miniGame: {
    coinToss: MiniGame;
    yavarwee?: MiniGame;
    plinko?: MiniGame;
  };
  shop?: {
    coinToss: ShopItem;
    yavarwee: ShopItem;
    plinko: ShopItem;
  };
  passCode?: string;
  maintainer: number[];
}
