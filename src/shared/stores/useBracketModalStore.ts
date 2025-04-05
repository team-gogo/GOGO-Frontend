import { create } from 'zustand';

interface BracketModalType {
  isBracketModalOpen: boolean;
  setIsBracketModalOpen: (status: boolean) => void;
}

const useBracketModalStore = create<BracketModalType>((set) => ({
  isBracketModalOpen: false,
  setIsBracketModalOpen: (status) =>
    set(() => ({ isBracketModalOpen: status })),
}));

export default useBracketModalStore;
