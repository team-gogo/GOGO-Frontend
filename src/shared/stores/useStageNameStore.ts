import { create } from 'zustand';

interface StageNameType {
  stageName: string;
  setStageName: (name: string) => void;
}

const useStageNameStore = create<StageNameType>((set) => ({
  stageName: '',
  setStageName: (name) => set(() => ({ stageName: name })),
}));

export default useStageNameStore;
