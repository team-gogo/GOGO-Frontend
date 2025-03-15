import { MatchResponse } from '@/shared/types/my/bet';

const getMatchInfo = (): MatchResponse => {
  return {
    count: 2,
    matches: [
      {
        matchId: 1001,
        aTeam: {
          teamId: 1,
          teamName: '팀 A',
          bettingPoint: 50,
          winCount: 10,
        },
        bTeam: {
          teamId: 2,
          teamName: '팀 B',
          bettingPoint: 30,
          winCount: 8,
        },
        startDate: '2025-03-10T12:00:00',
        endDate: '2025-03-10T14:00:00',
        isEnd: false,
        round: ['ROUND_OF_32'],
        category: ['SOCCER'],
        system: ['TOURNAMENT'],
        turn: 1,
        isNotice: false,
        betting: {
          isBetting: true,
          bettingPoint: 1000,
          predictedWinTeamId: 1,
        },
        result: {
          victoryTeamId: 1,
          aTeamScore: 2,
          bTeamScore: 1,
          isPredictionSuccess: true,
          earnedPoint: 200,
          pointReceivingTime: '2025-03-10T16:00:00',
        },
      },
      {
        matchId: 1002,
        aTeam: {
          teamId: 3,
          teamName: '팀 C',
          bettingPoint: 60,
          winCount: 12,
        },
        bTeam: {
          teamId: 4,
          teamName: '팀 D',
          bettingPoint: 40,
          winCount: 9,
        },
        startDate: '2025-03-11T15:00:00',
        endDate: '2025-03-22T17:00:00',
        isEnd: false,
        round: ['ROUND_OF_16'],
        category: ['BASKET_BALL'],
        system: ['FULL_LEAGUE'],
        turn: 2,
        isNotice: true,
        betting: {
          isBetting: false,
          bettingPoint: undefined,
          predictedWinTeamId: undefined,
        },
        result: undefined,
      },
      {
        matchId: 1003,
        aTeam: {
          teamId: 5,
          teamName: '팀 E',
          bettingPoint: 100,
          winCount: 15,
        },
        bTeam: {
          teamId: 6,
          teamName: '팀 F',
          bettingPoint: 90,
          winCount: 10,
        },
        startDate: '2025-03-10T12:00:00',
        endDate: '2025-03-10T14:00:00',
        isEnd: true,
        round: ['QUARTER_FINALS'],
        category: ['SOCCER'],
        system: ['TOURNAMENT'],
        turn: 3,
        isNotice: false,
        betting: {
          isBetting: true,
          bettingPoint: 500,
          predictedWinTeamId: 5,
        },
        result: {
          victoryTeamId: 6,
          aTeamScore: 1,
          bTeamScore: 2,
          isPredictionSuccess: false,
          earnedPoint: 0,
          pointReceivingTime: '2025-03-13T16:00:00',
        },
      },
      {
        matchId: 1004,
        aTeam: {
          teamId: 7,
          teamName: '팀 G',
          bettingPoint: 120,
          winCount: 14,
        },
        bTeam: {
          teamId: 8,
          teamName: '팀 H',
          bettingPoint: 80,
          winCount: 7,
        },
        startDate: '2025-03-17T10:00:00',
        endDate: '2025-03-18T12:00:00',
        isEnd: false,
        round: ['SEMI_FINALS'],
        category: ['SOCCER'],
        system: ['FULL_LEAGUE'],
        turn: 4,
        isNotice: false,
        betting: {
          isBetting: false,
          bettingPoint: undefined,
          predictedWinTeamId: undefined,
        },
        result: undefined,
      },
      {
        matchId: 1005,
        aTeam: {
          teamId: 9,
          teamName: '팀 I',
          bettingPoint: 1200,
          winCount: 14,
        },
        bTeam: {
          teamId: 10,
          teamName: '팀 J',
          bettingPoint: 800,
          winCount: 7,
        },
        startDate: '2025-03-20T10:00:00',
        endDate: '2025-03-20T12:00:00',
        isEnd: false,
        round: ['FINALS'],
        category: ['SOCCER'],
        system: ['FULL_LEAGUE'],
        turn: 4,
        isNotice: true,
        betting: {
          isBetting: true,
          bettingPoint: 800,
          predictedWinTeamId: 9,
        },
        result: undefined,
      },
    ],
  };
};

export default getMatchInfo;
