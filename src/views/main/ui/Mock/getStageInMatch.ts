import { StageInMatchResponse } from '@/shared/types/main';

const getStageInMatch = (): StageInMatchResponse => {
  return {
    count: 3,
    games: [
      {
        gameId: 1,
        gameName: '축구 경기',
        teamCount: 2,
        category: 'SOCCER',
        system: 'TOURNAMENT',
      },
      {
        gameId: 2,
        gameName: '농구 경기',
        teamCount: 4,
        category: 'BASKET_BALL',
        system: 'FULL_LEAGUE',
      },
      {
        gameId: 3,
        gameName: '배드민턴 경기',
        teamCount: 2,
        category: 'BADMINTON',
        system: 'SINGLE',
      },
      {
        gameId: 4,
        gameName: '롤 경기',
        teamCount: 5,
        category: 'LOL',
        system: 'SINGLE',
      },
      {
        gameId: 5,
        gameName: '배구 경기',
        teamCount: 12,
        category: 'VOLLEY_BALL',
        system: 'SINGLE',
      },
    ],
  };
};

export default getStageInMatch;
