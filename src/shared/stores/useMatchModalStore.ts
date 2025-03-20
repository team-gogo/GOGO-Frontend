import { create } from 'zustand';

interface MatchModalType {
  isMatchModalOpen: boolean;
  setIsMatchModalOpen: (status: boolean) => void;
}

const useMatchModalStore = create<MatchModalType>((set) => ({
  isMatchModalOpen: false,
  setIsMatchModalOpen: (status) => set(() => ({ isMatchModalOpen: status })),
}));

export default useMatchModalStore;
