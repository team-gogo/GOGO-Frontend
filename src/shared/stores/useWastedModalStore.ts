import { create } from 'zustand';

interface WastedModalType {
  isWastedModalOpen: boolean;
  setIsWastedModalOpen: (status: boolean) => void;
}

const useWastedModalStore = create<WastedModalType>((set) => ({
  isWastedModalOpen: false,
  setIsWastedModalOpen: (status) => set(() => ({ isWastedModalOpen: status })),
}));

export default useWastedModalStore;
