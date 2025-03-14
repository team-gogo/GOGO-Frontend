export interface TeamItem {
  teamId: number;
  teamName: string;
  participantCount: number;
}

export const getTeamItemMock = (): TeamItem[] => {
  return [
    { teamId: 1, teamName: '팀 이름', participantCount: 5 },
    { teamId: 2, teamName: '팀 이름', participantCount: 3 },
    { teamId: 3, teamName: '팀 이름', participantCount: 4 },
    { teamId: 4, teamName: '팀 이름', participantCount: 2 },
    { teamId: 5, teamName: '팀 이름', participantCount: 6 },
  ];
};
