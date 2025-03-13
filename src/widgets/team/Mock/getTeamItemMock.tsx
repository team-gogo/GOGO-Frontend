export interface TeamItem {
  id: number;
  name: string;
}

export const getTeamItemMock = (): TeamItem[] => {
  return [
    { id: 1, name: '팀 이름' },
    { id: 2, name: '팀 이름' },
    { id: 3, name: '팀 이름' },
    { id: 4, name: '팀 이름' },
    { id: 5, name: '팀 이름' },
  ];
};
