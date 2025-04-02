export type Round =
  | 'ROUND_OF_32'
  | 'ROUND_OF_16'
  | 'QUARTER_FINALS'
  | 'SEMI_FINALS'
  | 'FINALS';

export type System = 'TOURNAMENT' | 'FULL_LEAGUE' | 'SINGLE';

export interface TeamType {
  teamId: number;
  teamName: string;
  bettingPoint: number;
  winCount: number;
}

export interface BetType {
  isBetting: boolean;
  bettingPoint?: number;
  predictedWinTeamId?: number;
}

export type MatchData = {
  matchId: number;
  ateam: TeamType;
  bteam: TeamType;
  startDate: string;
  endDate: string;
  isEnd: boolean;
  round?: Round;
  category:
    | 'SOCCER'
    | 'BASKET_BALL'
    | 'BASE_BALL'
    | 'VOLLEY_BALL'
    | 'BADMINTON'
    // | 'LOL'
    | 'ETC';
  system?: System;
  turn?: number;
  isNotice: boolean;
  isPlayer: boolean;
  betting: BetType;
  result?: {
    victoryTeamId: number;
    aTeamScore: number;
    bTeamScore: number;
    isPredictionSuccess?: boolean;
    earnedPoint?: number;
    tempPointExpiredDate: string;
  };
};

export type MatchResponse = {
  count: number;
  matches: MatchData[];
};

export type TempPoint = {
  tempPointId: number;
  tempPoint: number;
  expiredDate: string;
};

export type TempPointsResponse = {
  tempPoints: TempPoint[];
};
