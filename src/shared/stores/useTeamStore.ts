import { create } from 'zustand';

interface TeamState {
  teamName: string;
  members: string[];
  setTeamName: (name: string) => void;
  setMembers: (members: string[]) => void;
  reset: () => void;
}

export const useTeamStore = create<TeamState>((set) => ({
  teamName: '',
  members: [],
  setTeamName: (name) => set({ teamName: name }),
  setMembers: (members) => set({ members }),
  reset: () => set({ teamName: '', members: [] }),
}));
