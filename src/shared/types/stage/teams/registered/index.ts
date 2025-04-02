interface Team {
  teamId: number;
  teamName: string;
  participantCount: number;
  winCount: number;
}

export interface TeamRegisterResponse {
  team: Team[];
}
