import { create } from 'zustand';

interface PointStoreType {
  point: number;
  setPoint: (name: number) => void;
}

const usePointStore = create<PointStoreType>((set) => ({
  point: 0,
  setPoint: (point) => set(() => ({ point: point })),
}));

export default usePointStore;
