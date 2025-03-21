import { create } from 'zustand';

interface CheckAgainModalType {
  isCheckAgainModalOpen: boolean;
  setIsCheckAgainModalOpen: (status: boolean) => void;
}

const useCheckAgainModalStore = create<CheckAgainModalType>((set) => ({
  isCheckAgainModalOpen: false,
  setIsCheckAgainModalOpen: (status) =>
    set(() => ({ isCheckAgainModalOpen: status })),
}));

export default useCheckAgainModalStore;
