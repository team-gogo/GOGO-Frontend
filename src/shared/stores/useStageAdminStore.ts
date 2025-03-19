import { create } from 'zustand';

interface StageAdminType {
  stageAdminArr: number[];
  addStageAdmin: (id: number) => void;
}

const useStageAdminStore = create<StageAdminType>((set) => ({
  stageAdminArr: [],
  addStageAdmin: (id) =>
    set((state) => {
      if (!state.stageAdminArr.includes(id)) {
        return { stageAdminArr: [...state.stageAdminArr, id] };
      }
      return state;
    }),
}));

export default useStageAdminStore;
