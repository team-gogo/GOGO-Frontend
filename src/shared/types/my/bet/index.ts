export type MatchData = {
  matchId: number;
  aTeam: {
    teamId: number;
    teamName: string;
    bettingPoint: number;
    winCount: number;
  };
  bTeam: {
    teamId: number;
    teamName: string;
    bettingPoint: number;
    winCount: number;
  };
  startDate: string;
  endDate: string;
  isEnd: boolean;
  round?: (
    | 'ROUND_OF_32'
    | 'ROUND_OF_16'
    | 'QUARTER_FINALS'
    | 'SEMI_FINALS'
    | 'FINALS'
  )[];
  category?: (
    | 'SOCCER'
    | 'BASKET_BALL'
    | 'BASE_BALL'
    | 'VOLLEY_BALL'
    | 'BADMINTON'
    | 'LOL'
    | 'ETC'
  )[];
  system?: ('TOURNAMENT' | 'FULL_LEAGUE' | 'SINGLE')[];
  turn?: number;
  isNotice: boolean;
  betting: {
    isBetting: boolean;
    bettingPoint?: number;
    predictedWinTeamId?: number;
  };
  result?: {
    victoryTeamId: number;
    aTeamScore: number;
    bTeamScore: number;
    isPredictionSuccess?: boolean;
    earnedPoint?: number;
    pointReceivingTime?: string;
  };
};

export type MyBetResponse = {
  count: number;
  matches: MatchData[];
};
