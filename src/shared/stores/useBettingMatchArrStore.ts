import { create } from 'zustand';

interface BettingMatchType {
  bettingMatchArr: { matchId: number; bettingPoint: number }[];
  setBettingMatchArr: (
    items: { matchId: number; bettingPoint: number }[],
  ) => void;
}

const useBettingMatchArrStore = create<BettingMatchType>((set) => ({
  bettingMatchArr: [],
  setBettingMatchArr: (items) => set({ bettingMatchArr: items }),
}));

export default useBettingMatchArrStore;
