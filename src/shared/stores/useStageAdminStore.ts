import { create } from 'zustand';

interface StageAdminType {
  stageAdminArr: number[];
  addStageAdmin: (ids: number[]) => void;
}

const useStageAdminStore = create<StageAdminType>((set) => ({
  stageAdminArr: [],
  addStageAdmin: (ids) =>
    set((state) => {
      const uniqueIds = ids.filter((id) => !state.stageAdminArr.includes(id));
      return uniqueIds.length > 0
        ? { stageAdminArr: [...state.stageAdminArr, ...uniqueIds] }
        : state;
    }),
}));

export default useStageAdminStore;
