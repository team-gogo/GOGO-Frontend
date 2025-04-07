import { GameFormatData } from '@/shared/types/stage/game';

const getBracketMock = (): GameFormatData => {
  return {
    format: [
      {
        round: 'SEMI_FINALS',
        match: [
          {
            matchId: 1,
            turn: 1,
            ateamId: 1,
            ateamName: '1',
            bteamId: 2,
            bteamName: '2',
            isEnd: false,
            winTeamId: null,
          },
          {
            matchId: 2,
            turn: 2,
            ateamId: null,
            ateamName: null,
            bteamId: 3,
            bteamName: '3',
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
            ateamId: null,
            ateamName: null,
            bteamId: null,
            bteamName: null,
            isEnd: false,
            winTeamId: null,
          },
        ],
      },
    ],
  };
};

export default getBracketMock;
