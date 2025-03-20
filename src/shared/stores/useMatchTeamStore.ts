import { create } from 'zustand';

interface Team {
  teamId: number;
  teamName: string;
  bettingPoint: number;
  winCount: number;
}

interface MatchTeamType {
  aTeam: Team | null;
  setATeam: (team: Team) => void;
  bTeam: Team | null;
  setBTeam: (team: Team) => void;
  matchId: number;
  setMatchId: (id: number) => void;
}

const useMatchTeamStore = create<MatchTeamType>((set) => ({
  aTeam: null,
  setATeam: (team: Team) => set(() => ({ aTeam: team })),
  bTeam: null,
  setBTeam: (team: Team) => set(() => ({ bTeam: team })),
  matchId: 0,
  setMatchId: (id) => set(() => ({ matchId: id })),
}));

export default useMatchTeamStore;
