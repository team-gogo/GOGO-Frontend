import { create } from 'zustand';

interface MyStageIdType {
  stageId: number;
  setStageId: (id: number) => void;
}

const useMyStageIdStore = create<MyStageIdType>((set) => ({
  stageId: 0,
  setStageId: (id) => set(() => ({ stageId: id })),
}));

export default useMyStageIdStore;
