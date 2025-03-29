import { create } from 'zustand';
import { MatchData } from '../types/my/bet';

export interface MatchStatus {
  isPlaying: boolean;
  isMatchFinish: boolean;
  time: string;
  roundText: string;
}

interface MatchType {
  matchStatus: MatchStatus;
  setMatchStatus: (status: MatchStatus) => void;
  match: MatchData | null;
  setMatch: (match: MatchData) => void;
}

const useMatchStore = create<MatchType>((set) => ({
  matchStatus: {
    isPlaying: false,
    isMatchFinish: false,
    time: '',
    roundText: '',
  },
  setMatchStatus: (status) => set({ matchStatus: status }),
  match: null,
  setMatch: (match: MatchData) => set(() => ({ match })),
}));

export default useMatchStore;
