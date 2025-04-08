import { create } from 'zustand';

interface PointStoreType {
  myBetPoint: number;
  setMyBetPoint: (point: number | ((prev: number) => number)) => void;
}

const useMyBetPointStore = create<PointStoreType>((set) => ({
  myBetPoint: 0,
  setMyBetPoint: (point) =>
    set((state) => ({
      myBetPoint: typeof point === 'function' ? point(state.myBetPoint) : point,
    })),
}));

export default useMyBetPointStore;
