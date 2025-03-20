import { create } from 'zustand';

interface MatchBatchArrType {
  matchBatchArr: { matchId: number; isEnd: boolean }[]; // matchId와 isEnd를 가진 객체로 수정
  setMatchBatchArr: (items: { matchId: number; isEnd: boolean }[]) => void;
}

const useMatchBatchArrStore = create<MatchBatchArrType>((set) => ({
  matchBatchArr: [],
  setMatchBatchArr: (items) => set({ matchBatchArr: items }),
}));

export default useMatchBatchArrStore;
