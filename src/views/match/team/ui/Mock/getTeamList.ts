import { TeamListResponse } from '@/shared/types/match';

const getTeamList = (): TeamListResponse => {
  return {
    count: 2,
    team: [
      {
        teamId: 1,
        teamName: '팀 A',
        participantCount: 5,
        winCount: 10,
      },
      {
        teamId: 2,
        teamName: '팀 B',
        participantCount: 4,
        winCount: 8,
      },
    ],
  };
};

export default getTeamList;
