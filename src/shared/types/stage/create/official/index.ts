type GameCategory =
  | 'SOCCER'
  | 'BASKET_BALL'
  | 'BASE_BALL'
  | 'VOLLEY_BALL'
  | 'BADMINTON'
  | 'LOL'
  | 'ETC';
type GameSystem = 'TOURNAMENT' | 'FULL_LEAGUE' | 'SINGLE';

interface Game {
  category: GameCategory[];
  name: string;
  system: GameSystem;
  teamMinCapacity: number;
  teamMaxCapacity: number;
}

interface MiniGame {
  isActive: boolean;
  maxBettingPoint?: number;
  minBettingPoint?: number;
}

interface ShopItem {
  isActive: boolean;
  price?: number;
  quantity?: number;
}

export interface OfficialStageData {
  stageName: string;
  game: Game[];
  initialPoint: number;
  rule: {
    maxBettingPoint: number;
    minBettingPoint: number;
  };
  miniGame: {
    coinToss: MiniGame;
    yavarwee: MiniGame;
    plinko: MiniGame;
  };
  shop: {
    coinToss: ShopItem;
    yavarwee: ShopItem;
    plinko: ShopItem;
  };
  passCode?: string;
  maintainer: number[];
}
