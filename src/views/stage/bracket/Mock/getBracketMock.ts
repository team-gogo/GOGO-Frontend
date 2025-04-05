interface BracketData {
  teamAId: number | null;
  teamBId: number | null;
  round:
    | 'ROUND_OF_32'
    | 'ROUND_OF_16'
    | 'QUARTER_FINALS'
    | 'SEMI_FINALS'
    | 'FINALS';
  turn: number;
}

const getBracketMock = (teamCount: number = 8): BracketData[] => {
  if (teamCount === 8) {
    return [
      {
        teamAId: 1,
        teamBId: 2,
        round: 'QUARTER_FINALS',
        turn: 1,
      },
      {
        teamAId: 3,
        teamBId: 4,
        round: 'QUARTER_FINALS',
        turn: 2,
      },
      {
        teamAId: 5,
        teamBId: 6,
        round: 'QUARTER_FINALS',
        turn: 3,
      },
      {
        teamAId: 7,
        teamBId: 8,
        round: 'QUARTER_FINALS',
        turn: 4,
      },
      {
        teamAId: null,
        teamBId: null,
        round: 'SEMI_FINALS',
        turn: 1,
      },
      {
        teamAId: null,
        teamBId: null,
        round: 'SEMI_FINALS',
        turn: 2,
      },
      {
        teamAId: null,
        teamBId: null,
        round: 'FINALS',
        turn: 1,
      },
    ];
  }

  if (teamCount === 7) {
    return [
      {
        teamAId: 1,
        teamBId: 2,
        round: 'QUARTER_FINALS',
        turn: 1,
      },
      {
        teamAId: 3,
        teamBId: 4,
        round: 'QUARTER_FINALS',
        turn: 2,
      },
      {
        teamAId: 5,
        teamBId: 6,
        round: 'QUARTER_FINALS',
        turn: 4,
      },
      {
        teamAId: 7,
        teamBId: null,
        round: 'SEMI_FINALS',
        turn: 2,
      },
      {
        teamAId: null,
        teamBId: null,
        round: 'SEMI_FINALS',
        turn: 2,
      },
      {
        teamAId: null,
        teamBId: null,
        round: 'FINALS',
        turn: 1,
      },
    ];
  }

  if (teamCount === 6) {
    return [
      {
        teamAId: 1,
        teamBId: 2,
        round: 'QUARTER_FINALS',
        turn: 1,
      },
      {
        teamAId: 3,
        teamBId: 4,
        round: 'QUARTER_FINALS',
        turn: 3,
      },
      {
        teamAId: null,
        teamBId: 5,
        round: 'SEMI_FINALS',
        turn: 1,
      },
      {
        teamAId: null,
        teamBId: 6,
        round: 'SEMI_FINALS',
        turn: 2,
      },
      {
        teamAId: null,
        teamBId: null,
        round: 'FINALS',
        turn: 1,
      },
    ];
  }

  if (teamCount === 5) {
    return [
      {
        teamAId: 1,
        teamBId: 2,
        round: 'QUARTER_FINALS',
        turn: 1,
      },
      {
        teamAId: null,
        teamBId: 3,
        round: 'SEMI_FINALS',
        turn: 1,
      },
      {
        teamAId: 4,
        teamBId: 5,
        round: 'SEMI_FINALS',
        turn: 2,
      },
      {
        teamAId: null,
        teamBId: null,
        round: 'FINALS',
        turn: 1,
      },
    ];
  }

  if (teamCount === 4) {
    return [
      {
        teamAId: 1,
        teamBId: 2,
        round: 'SEMI_FINALS',
        turn: 1,
      },
      {
        teamAId: 3,
        teamBId: 4,
        round: 'SEMI_FINALS',
        turn: 2,
      },
      {
        teamAId: null,
        teamBId: null,
        round: 'FINALS',
        turn: 1,
      },
    ];
  }

  if (teamCount === 3) {
    return [
      {
        teamAId: 1,
        teamBId: 2,
        round: 'SEMI_FINALS',
        turn: 1,
      },
      {
        teamAId: 3,
        teamBId: null,
        round: 'SEMI_FINALS',
        turn: 2,
      },
      {
        teamAId: null,
        teamBId: null,
        round: 'FINALS',
        turn: 1,
      },
    ];
  }

  return [];
};

export default getBracketMock;
