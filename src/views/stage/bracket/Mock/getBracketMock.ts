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

const getBracketMock = () => {
  const BracketMockData: BracketData[] = [
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

  return BracketMockData;
};

export default getBracketMock;
