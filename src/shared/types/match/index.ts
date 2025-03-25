export type Team = {
  teamId: number;
  teamName: string;
  participantCount: number;
  winCount: number;
};

export type TeamListResponse = {
  count: number;
  team: Team[];
};
