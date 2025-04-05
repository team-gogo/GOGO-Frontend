interface BracketData {
  round:
    | 'ROUND_OF_32'
    | 'ROUND_OF_16'
    | 'QUARTER_FINALS'
    | 'SEMI_FINALS'
    | 'FINALS';
  match: {
    matchId: number;
    turn: number;
    aTeamId: number | null;
    aTeamName: string | null;
    bTeamId: number | null;
    bTeamName: string | null;
    isEnd: boolean;
    winTeamId: number | null;
  }[];
}

const getBracketMock = (teamCount: number = 8): BracketData[] => {
  if (teamCount === 8) {
    return [
      {
        round: 'QUARTER_FINALS',
        match: [
          {
            matchId: 1,
            turn: 1,
            aTeamId: 1,
            aTeamName: '1',
            bTeamId: 2,
            bTeamName: '2',
            isEnd: false,
            winTeamId: null,
          },
          {
            matchId: 2,
            turn: 2,
            aTeamId: 3,
            aTeamName: '3',
            bTeamId: 4,
            bTeamName: '4',
            isEnd: false,
            winTeamId: null,
          },
          {
            matchId: 3,
            turn: 3,
            aTeamId: 5,
            aTeamName: '5',
            bTeamId: 6,
            bTeamName: '6',
            isEnd: false,
            winTeamId: null,
          },
          {
            matchId: 4,
            turn: 4,
            aTeamId: 7,
            aTeamName: '7',
            bTeamId: 8,
            bTeamName: '8',
            isEnd: false,
            winTeamId: null,
          },
        ],
      },
      {
        round: 'SEMI_FINALS',
        match: [
          {
            matchId: 5,
            turn: 1,
            aTeamId: null,
            aTeamName: null,
            bTeamId: null,
            bTeamName: null,
            isEnd: false,
            winTeamId: null,
          },
          {
            matchId: 6,
            turn: 2,
            aTeamId: null,
            aTeamName: null,
            bTeamId: null,
            bTeamName: null,
            isEnd: false,
            winTeamId: null,
          },
        ],
      },
      {
        round: 'FINALS',
        match: [
          {
            matchId: 7,
            turn: 1,
            aTeamId: null,
            aTeamName: null,
            bTeamId: null,
            bTeamName: null,
            isEnd: false,
            winTeamId: null,
          },
        ],
      },
    ];
  }

  if (teamCount === 7) {
    return [
      {
        round: 'QUARTER_FINALS',
        match: [
          {
            matchId: 1,
            turn: 1,
            aTeamId: 1,
            aTeamName: '1',
            bTeamId: 2,
            bTeamName: '2',
            isEnd: false,
            winTeamId: null,
          },
          {
            matchId: 2,
            turn: 2,
            aTeamId: 30,
            aTeamName: '30',
            bTeamId: 4,
            bTeamName: '4',
            isEnd: false,
            winTeamId: null,
          },
          {
            matchId: 3,
            turn: 4,
            aTeamId: 5,
            aTeamName: '5',
            bTeamId: 6,
            bTeamName: '6',
            isEnd: false,
            winTeamId: null,
          },
        ],
      },
      {
        round: 'SEMI_FINALS',
        match: [
          {
            matchId: 4,
            turn: 1,
            aTeamId: null,
            aTeamName: null,
            bTeamId: null,
            bTeamName: null,
            isEnd: false,
            winTeamId: null,
          },
          {
            matchId: 5,
            turn: 2,
            aTeamId: 7,
            aTeamName: '7',
            bTeamId: null,
            bTeamName: null,
            isEnd: false,
            winTeamId: null,
          },
        ],
      },
      {
        round: 'FINALS',
        match: [
          {
            matchId: 6,
            turn: 1,
            aTeamId: null,
            aTeamName: null,
            bTeamId: null,
            bTeamName: null,
            isEnd: false,
            winTeamId: null,
          },
        ],
      },
    ];
  }

  if (teamCount === 6) {
    return [
      {
        round: 'QUARTER_FINALS',
        match: [
          {
            matchId: 1,
            turn: 1,
            aTeamId: 1,
            aTeamName: '1',
            bTeamId: 2,
            bTeamName: '2',
            isEnd: false,
            winTeamId: null,
          },
          {
            matchId: 2,
            turn: 3,
            aTeamId: 3,
            aTeamName: '3',
            bTeamId: 4,
            bTeamName: '4',
            isEnd: false,
            winTeamId: null,
          },
        ],
      },
      {
        round: 'SEMI_FINALS',
        match: [
          {
            matchId: 3,
            turn: 1,
            aTeamId: null,
            aTeamName: null,
            bTeamId: 5,
            bTeamName: '5',
            isEnd: false,
            winTeamId: null,
          },
          {
            matchId: 4,
            turn: 2,
            aTeamId: null,
            aTeamName: null,
            bTeamId: 6,
            bTeamName: '6',
            isEnd: false,
            winTeamId: null,
          },
        ],
      },
      {
        round: 'FINALS',
        match: [
          {
            matchId: 5,
            turn: 1,
            aTeamId: null,
            aTeamName: null,
            bTeamId: null,
            bTeamName: null,
            isEnd: false,
            winTeamId: null,
          },
        ],
      },
    ];
  }

  if (teamCount === 5) {
    return [
      {
        round: 'QUARTER_FINALS',
        match: [
          {
            matchId: 1,
            turn: 1,
            aTeamId: 1,
            aTeamName: '1',
            bTeamId: 2,
            bTeamName: '2',
            isEnd: false,
            winTeamId: null,
          },
        ],
      },
      {
        round: 'SEMI_FINALS',
        match: [
          {
            matchId: 2,
            turn: 1,
            aTeamId: null,
            aTeamName: null,
            bTeamId: 3,
            bTeamName: '3',
            isEnd: false,
            winTeamId: null,
          },
          {
            matchId: 3,
            turn: 2,
            aTeamId: 4,
            aTeamName: '4',
            bTeamId: 5,
            bTeamName: '5',
            isEnd: false,
            winTeamId: null,
          },
        ],
      },
      {
        round: 'FINALS',
        match: [
          {
            matchId: 4,
            turn: 1,
            aTeamId: null,
            aTeamName: null,
            bTeamId: null,
            bTeamName: null,
            isEnd: false,
            winTeamId: null,
          },
        ],
      },
    ];
  }

  if (teamCount === 4) {
    return [
      {
        round: 'SEMI_FINALS',
        match: [
          {
            matchId: 1,
            turn: 1,
            aTeamId: 1,
            aTeamName: '1',
            bTeamId: 2,
            bTeamName: '2',
            isEnd: false,
            winTeamId: null,
          },
          {
            matchId: 2,
            turn: 2,
            aTeamId: 3,
            aTeamName: '3',
            bTeamId: 4,
            bTeamName: '4',
            isEnd: false,
            winTeamId: null,
          },
        ],
      },
      {
        round: 'FINALS',
        match: [
          {
            matchId: 3,
            turn: 1,
            aTeamId: null,
            aTeamName: null,
            bTeamId: null,
            bTeamName: null,
            isEnd: false,
            winTeamId: null,
          },
        ],
      },
    ];
  }

  if (teamCount === 3) {
    return [
      {
        round: 'SEMI_FINALS',
        match: [
          {
            matchId: 1,
            turn: 1,
            aTeamId: 1,
            aTeamName: '1',
            bTeamId: 2,
            bTeamName: '2',
            isEnd: false,
            winTeamId: null,
          },
          {
            matchId: 2,
            turn: 2,
            aTeamId: null,
            aTeamName: null,
            bTeamId: 3,
            bTeamName: '3',
            isEnd: false,
            winTeamId: null,
          },
        ],
      },
      {
        round: 'FINALS',
        match: [
          {
            matchId: 3,
            turn: 1,
            aTeamId: null,
            aTeamName: null,
            bTeamId: null,
            bTeamName: null,
            isEnd: false,
            winTeamId: null,
          },
        ],
      },
    ];
  }

  return [];
};

export default getBracketMock;
