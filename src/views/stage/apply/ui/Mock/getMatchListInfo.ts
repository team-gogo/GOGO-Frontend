import { MatchGamesResponse } from '@/shared/types/stage/apply';

const getMatchListInfo = (): MatchGamesResponse => {
  return {
    games: [
      {
        gameId: 1,
        gameName: 'Soccer Championship',
        teamCount: 16,
        category: ['SOCCER'],
        system: ['FULL_LEAGUE'],
        isParticipating: true,
      },
      {
        gameId: 2,
        gameName: 'NBA Finals',
        teamCount: 30,
        category: ['BASKET_BALL'],
        system: ['FULL_LEAGUE'],
        isParticipating: false,
      },
      {
        gameId: 3,
        gameName: 'World Series',
        teamCount: 30,
        category: ['BASE_BALL'],
        system: ['FULL_LEAGUE'],
        isParticipating: true,
      },
      {
        gameId: 4,
        gameName: 'Volleyball World Cup',
        teamCount: 24,
        category: ['VOLLEY_BALL'],
        system: ['TOURNAMENT'],
        isParticipating: false,
      },
      {
        gameId: 5,
        gameName: 'Badminton Open',
        teamCount: 16,
        category: ['BADMINTON'],
        system: ['SINGLE'],
        isParticipating: false,
      },
      {
        gameId: 6,
        gameName: 'League of Legends Worlds',
        teamCount: 24,
        category: ['LOL'],
        system: ['TOURNAMENT'],
        isParticipating: true,
      },
      {
        gameId: 7,
        gameName: 'Miscellaneous Tournament',
        teamCount: 8,
        category: ['ETC'],
        system: ['SINGLE'],
        isParticipating: true,
      },
    ],
  };
};

export default getMatchListInfo;
