import { create } from 'zustand';

interface MatchNoticeType {
  matchNoticeArr: { matchId: number; isNotice: boolean }[];
  setMatchNoticeArr: (items: { matchId: number; isNotice: boolean }[]) => void;
}

const useMatchNoticeStore = create<MatchNoticeType>((set) => ({
  matchNoticeArr: [],
  setMatchNoticeArr: (items) => set({ matchNoticeArr: items }),
}));

export default useMatchNoticeStore;
