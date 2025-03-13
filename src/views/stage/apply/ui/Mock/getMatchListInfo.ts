import { MatchGamesResponse } from '@/shared/types/stage/apply';

const getMatchListInfo = (): MatchGamesResponse => {
  return {
    games: [
      {
        gameId: 1,
        gameName: 'Soccer Championship',
        teamCount: 16,
        category: ['SOCCER'],
      },
      {
        gameId: 2,
        gameName: 'NBA Finals',
        teamCount: 30,
        category: ['BASKET_BALL'],
      },
      {
        gameId: 3,
        gameName: 'World Series',
        teamCount: 30,
        category: ['BASE_BALL'],
      },
      {
        gameId: 4,
        gameName: 'Volleyball World Cup',
        teamCount: 24,
        category: ['VOLLEY_BALL'],
      },
      {
        gameId: 5,
        gameName: 'Badminton Open',
        teamCount: 16,
        category: ['BADMINTON'],
      },
      {
        gameId: 6,
        gameName: 'League of Legends Worlds',
        teamCount: 24,
        category: ['LOL'],
      },
      {
        gameId: 7,
        gameName: 'Miscellaneous Tournament',
        teamCount: 8,
        category: ['ETC'],
      },
    ],
  };
};

export default getMatchListInfo;
