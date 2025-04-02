import { create } from 'zustand';

interface BettingMatchType {
  bettingMatchArr: { matchId: number; bettingPoint: number }[];
  setBettingMatchArr: (
    updater: (
      prev: { matchId: number; bettingPoint: number }[],
    ) => { matchId: number; bettingPoint: number }[],
  ) => void;
}

const useBettingMatchArrStore = create<BettingMatchType>((set) => ({
  bettingMatchArr: [],
  setBettingMatchArr: (updater) =>
    set((state) => ({ bettingMatchArr: updater(state.bettingMatchArr) })),
}));

export default useBettingMatchArrStore;
