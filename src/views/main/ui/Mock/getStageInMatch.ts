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
        teamMinCapacity: 11,
        teamMaxCapacity: 15,
      },
      {
        gameId: 2,
        gameName: '농구 경기',
        teamCount: 4,
        category: 'BASKET_BALL',
        system: 'FULL_LEAGUE',
        teamMinCapacity: 5,
        teamMaxCapacity: 7,
      },
      {
        gameId: 3,
        gameName: '배드민턴 경기',
        teamCount: 2,
        category: 'BADMINTON',
        system: 'SINGLE',
        teamMinCapacity: 1,
        teamMaxCapacity: 2,
      },
      {
        gameId: 4,
        gameName: '롤 경기',
        teamCount: 5,
        category: 'LOL',
        system: 'SINGLE',
        teamMinCapacity: 5,
        teamMaxCapacity: 5,
      },
      {
        gameId: 5,
        gameName: '배구 경기',
        teamCount: 12,
        category: 'VOLLEY_BALL',
        system: 'SINGLE',
        teamMinCapacity: 6,
        teamMaxCapacity: 8,
      },
    ],
  };
};

export default getStageInMatch;
